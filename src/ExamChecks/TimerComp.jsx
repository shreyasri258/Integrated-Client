import React, { useEffect, useRef } from 'react';
import Timer from "../timer/Timer";
import {setTimeExpired,getTimeExpired,} from "../store/slices/examTimer"
  import { useDispatch, useSelector } from "react-redux";


const TimerComponent = ({ duration }) => {
    const countdownRef = useRef(null);
    const dispatch = useDispatch();
    const isTimeExpired = useSelector(getTimeExpired);

    useEffect(() => {
        countdownRef.current = setTimeout(() => {
            // setTimeExpired(true);
            dispatch(setTimeExpired(true));
            console.log(`timer comp ${isTimeExpired}, ${getTimeExpired}}`)
            // window.close();
        }, duration * 60 * 1000);

        return () => clearTimeout(countdownRef.current);
    }, [duration, isTimeExpired, dispatch]);

    return (
        <div className="timer">
            <Timer initialMinute={duration}/>
        </div>
    );
};

export default TimerComponent;
