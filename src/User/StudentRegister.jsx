import React, { useState, useRef, useEffect } from 'react';
import '../css/UserRegister.css';
import CommonInput from '../GeneralFiles/CommonInput';
import { Link } from 'react-router-dom';
import Icon from "../images/Icon.png";
import socketIOClient from 'socket.io-client';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const inputField = ['email', 'username', 'password', 'institutionName'];
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const StudentRegister = () => {
  const [showModal, setShowModal] = useState(false);
  const [capturedImage, setCapturedImage] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
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

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
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
    // console.log(e.target.value)
    // const formData = new FormData(e.target); // Pass the event target directly to FormData constructor
    // console.log(formData)
    console.log(inputValues)
    const data = inputValues;
    // inputValues.forEach((value, key) => {
    //   data[key] = value;
    // });
    console.log('data - ',data)
    try {
      let res=await axios.post("http://localhost:8800/Server/user/register", data);
      
      if (res.status === 201) {
        toast.success("Student registered successfully", { position: "top-right" });
        setShowModal(true);}
    } catch (error) {
      if (error.response.status === 400) {
        toast.error("Student is already registered");
      } 
     else if (error.response.status === 403) {
        toast.error("Socket Error");
      } 
      
      else {
        toast.error("An error occurred. Please try again later.");
      }
      console.error('Registration error:', error);
    }
    console.log('Registration values:', inputValues);
  };
  
  const handleInputChange = (fieldName, value) => {
    setInputValues(prevValues => ({
      ...prevValues,
      [fieldName]: value,
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
        <form >
        <div className="input-fields" style={{ display: 'flex', flexDirection: 'column', marginBottom: '20px' }}>
            <input type="text" name="username" placeholder="User Name" onChange={(e) => handleInputChange('username', e.target.value)} />
            <input type="text" name="institutionName" placeholder="Institution Name" onChange={(e) => handleInputChange('institutionName', e.target.value)} />
            <input type="email" name="email" placeholder="Email" onChange={(e) => handleInputChange('email', e.target.value)} />
            <div className='relative w-full pr-25  px-4'>
            <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                name="password"
                value={inputValues.password || ""}
                onChange={(e) => handleInputChange("password", e.target.value)}
                
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                onMouseDown={(e) => e.preventDefault()}
                className="absolute right-2 top-2 cursor-pointer bg-transparent border-none text-black"
            
               >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
              </div>
            

          </div>
          {/* <button type="submit">Register</button> */}
        
  
        
        {capturedImage && <img src={capturedImage} alt="captured" />}
        <video ref={videoRef} autoPlay playsInline style={{ display: 'none' }} />
        <canvas ref={canvasRef} style={{ display: 'none' }} />
        <button type="button" onClick={startCamera}>Start Camera</button>
        <button type="button" onClick={handleCapture}>Capture Image</button>
        <button type="button" onClick={handleRegister}  disabled={numPeopleDetected !== 1}>
          Register
        </button>
        </form>
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
