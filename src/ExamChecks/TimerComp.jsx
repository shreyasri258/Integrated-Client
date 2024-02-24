import React, { useEffect, useRef } from 'react';
import Timer from "../timer/Timer";

const TimerComponent = ({ duration, setTimerExpired }) => {
    const countdownRef = useRef(null);

    useEffect(() => {
        countdownRef.current = setTimeout(() => {
            setTimerExpired(true);
            window.close();
        }, duration * 60 * 1000);

        return () => clearTimeout(countdownRef.current);
    }, [duration, setTimerExpired]);

    return (
        <div className="timer">
            <Timer initialMinute={duration}/>
        </div>
    );
};

export default TimerComponent;
