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
  // http://localhost:8800/Server/user/register

  const handleRegister = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = {};
    formData.forEach((value, key) => {
      data[key] = value;
    });
    try{
      await axios.post("http://localhost:8800/Server/user/register",data);
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
    <div className="user-register" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
      <div className="logo"  >
        <img src={Icon} alt="proctorpal-logo" />
      </div>
      <div className="register-form" style={{ border: '1px solid #ccc', borderRadius: '14px', padding: '20px', boxShadow: '0 0 20px rgba(0, 0, 0, 0.2)' }}>
        <h1 className="title-heading" style={{ textAlign: 'center', marginBottom: '20px' }}>Examinee Register</h1>
        <form onSubmit={handleRegister}>
        <div className="input-fields" style={{ display: 'flex', flexDirection: 'column', marginBottom: '20px' }}>
            <input type="text" name="adminname" placeholder="Admin Name" />
            <input type="text" name="institutionName" placeholder="Institution Name" />
            <input type="email" name="email" placeholder="Email" />
            <input type="password" name="password" placeholder="Password" />
          </div>
          <button type="submit">Register</button>
        </form>
  
        
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
