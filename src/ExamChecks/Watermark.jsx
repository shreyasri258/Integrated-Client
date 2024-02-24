import React from 'react';
import '../ExamChecks/watermark.css'

const Watermark = ({ studentName, studentEmail }) => {
    const renderWatermark = () => {
        const watermarks = [];
        const screenWidth = window.screen.width;
        const screenHeight = window.screen.height;
        const nameLength = studentName.length;
        

        for (let i = 0; i < screenWidth; i += nameLength * 100) {
            for (let j = 0; j < screenHeight; j += 100) {
                watermarks.push(
                    <div key={`name-${i}-${j}`} className="watermark" style={{ top: `${j}px`, left: `${i}px` }}>
                        {studentName}
                    </div>
                );
                watermarks.push(
                    <div key={`email-${i}-${j}`} className="watermark" style={{ top: `${j+40}px`, left: `${i}px` }}>
                        {studentEmail}
                    </div>
                );
            }
        }

        return watermarks;
    };

    return <>{renderWatermark()}</>;
};

export default Watermark;
