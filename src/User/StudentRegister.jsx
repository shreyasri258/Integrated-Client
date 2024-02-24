import React, { useState, useRef, useEffect } from 'react';
import '../css/UserRegister.css';
import CommonInput from '../GeneralFiles/CommonInput';
import { Link } from 'react-router-dom';
import Icon from "../images/Icon.png";
import socketIOClient from 'socket.io-client';
import axios from 'axios';
const inputField = ['email', 'username', 'password', 'institutionName'];

const StudentRegister = () => {
  const [showModal, setShowModal] = useState(false);
  const [capturedImage, setCapturedImage] = useState(null);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [inputValues, setInputValues] = useState({
    'email': '',
    'username': '',
    'password': '',
    'institutionName': '',
    'profilePic' : ''
  });
  const [socket, setSocket] = useState(null);
  const [numPeopleDetected, setNumPeopleDetected] = useState(0);

  useEffect(() => {
    const socket = socketIOClient('http://localhost:8080'); // Change the URL to your server's URL
    setSocket(socket);

    socket.on('connect', () => {
      console.log('Socket connected');
    });

    socket.on('result', (data) => {
      console.log('Server response:', data);
      setNumPeopleDetected(data.num_people);
      setInputValues(prevValues => ({
        ...prevValues,
        'profilePic': data.image,
      }));
    });

    return () => socket.disconnect(); // Cleanup on unmount
  }, []);

  const startCamera = async () => {
    try {
      const constraints = {
        video: {
          facingMode: 'user',
          width: { ideal: 640 },
          height: { ideal: 480 }
        }
      };
  
      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      videoRef.current.srcObject = stream;
      videoRef.current.style.display = 'block'; // Show the video element
    } catch (error) {
      console.error('Error accessing camera:', error);
    }
  };

  const handleCapture = () => {
    const context = canvasRef.current.getContext('2d');
    context.drawImage(videoRef.current, 0, 0, canvasRef.current.width, canvasRef.current.height);

    const image = new Image();
    image.src = canvasRef.current.toDataURL('image/jpeg');
    setCapturedImage(image.src);
    setInputValues(prevValues => ({
      ...prevValues,
      'profilePic': image.src,
    }));

    sendImageToServer(image);
  };

  const sendImageToServer = (image) => {
    if (socket) {
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');
      canvas.width = videoRef.current.videoWidth; // Set canvas dimensions to match video
      canvas.height = videoRef.current.videoHeight;
      context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
      const base64Image = canvas.toDataURL('image/jpeg');

      socket.emit('image', { img: base64Image }); // Emit the base64 encoded image to the server
    }
  };
  

  const handleRegister = async (e) => {
    e.preventDefault();
    // Handle registration logic here
    try{
      const response = await axios.post("http://localhost:8800/Server/user/register",inputValues)
      console.log(JSON.stringify(response));
    } catch(error){
      console.log('Registration Failed!', error.message);
    }

    console.log('Registration values:', inputValues);
    setShowModal(true);
  };

  const handleInputChange = (fieldName, value) => {
    setInputValues(prevValues => ({
      ...prevValues,
      [fieldName]: value.target.value,
    }));
  };

  const allFieldsFilled = Object.values(inputValues).every(value => value.trim() !== '');

  return (
    <div className="user-register">
      <div className="logo">
        <img src={Icon} alt="proctorpal-logo" />
      </div>
      <div className="register-form">
        <h1 className="title-heading">Examinee Register</h1>
        <div className="input-fields">
          {inputField.map((item) => {
            let type;
            switch (item) {
              case "email":
                type = "email";
                break;
              case "username":
                type = "text";
                break;
              case "password":
                type = "password";
                break;
              case "institutionName":
                type = "text";
                break;
              default:
                type = "text";
            }
            return (
              <CommonInput
                key={item}
                placeholderText={item}
                value={inputValues[item]}
                onChange={(value) => handleInputChange(item, value)}
                type={type}
              />
            );
          })}
        </div>
        {capturedImage && <img src={capturedImage} alt="captured" />}
        <video ref={videoRef} autoPlay playsInline style={{ display: 'none' }} />
        <canvas ref={canvasRef} style={{ display: 'none' }} />
        <button onClick={startCamera}>Start Camera</button>
        <button onClick={handleCapture}>Capture Image</button>
        <button onClick={handleRegister} disabled={numPeopleDetected !== 1}>
          Register
        </button>
        {numPeopleDetected !== 1 && <p>Please ensure only one face is visible</p>}
      </div>
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-card">
            <p>Registration successful!</p>
            <div className="modal-buttons">
              <Link to="/student-login">
                <button>Login</button>
              </Link>
              <Link to="/">
                <button>Home Page</button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentRegister;
