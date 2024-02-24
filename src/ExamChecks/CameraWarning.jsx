import React, { useState, useEffect } from 'react';
import '../src/css/CameraWarning.css';

const CameraWarningPopup = ({ message }) => {
    const [isCameraOn, setIsCameraOn] = useState(true);

    useEffect(() => {
        const checkCameraStatus = () => {
            navigator.mediaDevices.getUserMedia({ video: true })
                .then(() => {
                    setIsCameraOn(true);
                })
                .catch(() => {
                    setIsCameraOn(false);
                });
        };

        const cameraCheckId = setInterval(() => checkCameraStatus(), 10000);

        return () => clearInterval(cameraCheckId);
    }, []);

    return (
        <div className="camera-popup" style={{ display: isCameraOn ? 'none' : 'flex' }}>
            <div className="popup-content">
                <h2>Warning: Camera is off</h2>
                <h3>{message}</h3>
            </div>
        </div>
    );
};

export default CameraWarningPopup;
