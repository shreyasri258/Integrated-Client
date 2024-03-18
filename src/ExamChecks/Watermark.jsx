import React, { useState, useEffect } from 'react';
import '../ExamChecks/watermark.css';

const Watermark = ({ studentName, studentEmail }) => {
    const [iframePosition, setIframePosition] = useState({ top: 0, left: 0 });

    useEffect(() => {
        const iframeElement = document.getElementById('embeddedFormIframe');
        if (iframeElement) {
            const { top, left } = iframeElement.getBoundingClientRect();
            setIframePosition({ top, left });
        }
    }, []);

    const renderWatermark = () => {
        const watermarks = [];
        const screenWidth = window.screen.width;
        const screenHeight = window.screen.height;
        const nameLength = studentName.length;
    
        const middleStart = screenWidth / 4;
        const middleEnd = (screenWidth / 3) * 2;
    
        for (let i = 0; i < screenWidth; i += nameLength * 100) {
            for (let j = 0; j < screenHeight; j += 100) {
                if (i < middleStart || i > middleEnd) {
                    watermarks.push(
                        <div key={`name-${i}-${j}`} className="watermark" style={{ top: `${j + iframePosition.top}px`, left: `${i + iframePosition.left}px` }}>
                            {studentName}
                        </div>
                    );
                    watermarks.push(
                        <div key={`email-${i}-${j}`} className="watermark" style={{ top: `${j + 80 + iframePosition.top}px`, left: `${i + iframePosition.left}px` }}>
                            {studentEmail}
                        </div>
                    );
                }
            }
        }
    
        return watermarks;
    };
    

    return <>{renderWatermark()}</>;
};

export default Watermark;
