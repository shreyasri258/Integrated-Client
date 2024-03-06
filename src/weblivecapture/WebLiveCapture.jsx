// import React, { useState, useEffect } from 'react';
// import Webcam from 'react-webcam';
// import axios from 'axios';
// import './weblivecapture.css';

// const videoConstraints = {
//   width: 2000,//1280,
//   height: 1200,//720,
//   facingMode: 'user'
// };

// const WebLiveCapture = () => {
//   const webcamRef = React.useRef(null);
//   const [image, setImage] = useState('');
//   const [resPose, setResPose] = useState('');
//   const [resPeople, setResPeople] = useState('');

//   const captureAndSendImage = async () => {
//     const imageSrc = webcamRef.current.getScreenshot();
//     setImage(imageSrc);

//     if (!imageSrc) {
//       console.error('No image captured.');
//       return;
//     }

//     // Convert data URL to base64
//     const base64Image = imageSrc;

//     try {
//       // Send image to predict_pose route
//       const responsePose = await axios.post('http://127.0.0.1:8080/predict_pose', {
//         img: base64Image
//       });
//       console.log('Response from predict_pose:', responsePose.data);
//       setResPose(responsePose.data.message || 'No response from predict_pose');

//       // Send image to predict_people route
//       const responsePeople = await axios.post('http://127.0.0.1:8080/predict_people', {
//         img: base64Image
//       });
//       console.log('Response from predict_people:', responsePeople.data);
//       setResPeople(responsePeople.data.message || 'No response from predict_people');
//     } catch (error) {
//       console.error('Error sending image to server:', error.message);
//     }
//   };

//   useEffect(() => {
//     const intervalId = setInterval(() => {
//       captureAndSendImage();
//     }, 10000); // 10 seconds

//     return () => clearInterval(intervalId); // Cleanup on component unmount
//   }, []);

//   return (
//     <div>
//       <div className="content">
//         {/* Display the response from the server for predict_pose */}
//         <h1>Response from predict_pose: {resPose}</h1>
//         {/* Display the response from the server for predict_people */}
//         <h1>Response from predict_people: {resPeople}</h1>
//       </div>

//       <React.Fragment>
//         <Webcam
//           audio={false}
//           ref={webcamRef}
//           screenshotFormat="image/jpeg"
//           height={150}
//           width={300}
//           videoConstraints={videoConstraints}
//         />
//       </React.Fragment>
//     </div>
//   );
// };

// export default WebLiveCapture;

import React, { useState, useEffect } from 'react';
import Webcam from 'react-webcam';
import './weblivecapture.css';
import socketIOClient from 'socket.io-client';
import Swal from 'sweetalert2';

const videoConstraints = {
  width: 2000,
  height: 1200,
  facingMode: 'user'
};

const WebLiveCapture = () => {
  const webcamRef = React.useRef(null);
  const [error, setError] = useState('');
  const [numPeople, setNumPeople] = useState(0);
  const [numMobiles, setNumMobiles] = useState(0); // State for number of mobile phones detected
  const [socket, setSocket] = useState(null);
  const [peopleCount, setPeopleCount] = useState(0);
  const [malpracticesCount, setMalpracticesCount] = useState(0);
  const [terminateExam, setTerminateExam] = useState(false);
  const [warningCnt, setWarningCnt] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  // const sound = new Audio(Warning);
  useEffect(() => {
    const socket = socketIOClient('http://localhost:8080');
    setSocket(socket);

    socket.on('connect', () => {
      console.log('Socket connected');
    });

    return () => socket.disconnect(); // Cleanup on unmount
  }, []);

  useEffect(() => {
    const captureAndSendImage = () => {
      const imageSrc = webcamRef.current.getScreenshot();
      if (!imageSrc) {
        console.error('No image captured.');
        return;
      }
  
      // Check if socket is not null before emitting
      if (socket) {
        // Emit the captured image to the server
        socket.emit('image', { img: imageSrc });
      } else {
        console.error('Socket connection not established.');
      }
    };
  
    // Set up interval to capture and send image
    const intervalId = setInterval(() => {
      captureAndSendImage();
    }, 10000); // 10 seconds
  
    // Listen for 'result' event from the server
    if (socket) {
      socket.on('result', (data) => {
        const { status, message, num_people, num_mobiles, pose } = data;
        console.log(data);
        if (status === 'success') {
          setNumPeople(num_people);
          setNumMobiles(num_mobiles); // Update state with the number of mobile phones detected
          setTotalCount(totalCount => totalCount + 1);
          // Additional logic based on the number of people detected
          if (num_people > 1) {
            setPeopleCount(peopleCount => peopleCount + 1);
            if (peopleCount > 1 || totalCount > 8) {
              setTerminateExam(true);
              clearInterval(intervalId); // Stop capturing images
            }
          } else if (num_people === 0) {
            setPeopleCount(peopleCount => peopleCount + 1);
          } else if (num_people !== 1) {
            setMalpracticesCount(prevCount => prevCount + 1);
          }

          // Display warning message for multiple people
          if (num_people !== 1) {
            // sound.play()
            Swal.fire({
              icon: 'warning',
              title: 'Warning',
              text: `Only single person should take the exam, Warning count: ${warningCnt}`,
              customClass: {
                popup: 'my-popup-class',
              },
            }).then(() => {
              setWarningCnt(warningCnt + 1);
            });
          }
          
          // Handle pose data if available
          if (pose) {
            // Process pose data here, if needed
          }
        } else {
          console.error('Error:', message);
        }
      });
    }
  
    // Cleanup socket listener on component unmount
    return () => {
      if (socket) {
        socket.off('result');
      }
    };
  }, [socket, numPeople, peopleCount, warningCnt, totalCount]);

  useEffect(() => {
    if (terminateExam) {
      // sound.play()
      Swal.fire({
        title: 'Exam Terminated',
        text: 'Total count exceeded, exam terminated.',
        allowOutsideClick: false,
        allowEscapeKey: false,
        allowEnterKey: false,
        showConfirmButton: false
      });
    }
  }, [terminateExam]);

  return (
    <React.Fragment>
      <Webcam
        audio={false}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        height={150}
        width={300}
        videoConstraints={videoConstraints}
      />
    </React.Fragment>
  );
};

export default WebLiveCapture;

