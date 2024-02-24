import React from 'react';
import WebLiveCapture from '../weblivecapture/WebLiveCapture';

const LeftColumn = ({ studentName, studentEmail }) => (
    <div className="left-column">
        <div className="image-capture">
            <WebLiveCapture />
        </div>
       
        
    </div>
);

export default LeftColumn;
