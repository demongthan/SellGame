"use client"

import React, { useEffect, useState } from 'react'

interface Props{
    time:number,
    eventEndOfTime:()=>void
}

const CountdownTimer = ({time, eventEndOfTime}:Props) => {
    const [timeLeft, setTimeLeft] = useState<number>(time);

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
        }, 1000);
    
        return () => clearInterval(timer);
    }, []);
  
    const formatTime = (time:number) => {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;

        if(time==0){
            eventEndOfTime();
        }
        
        return `${minutes.toString().padStart(2, '0')}:${seconds
            .toString()
            .padStart(2, '0')}`;
    };
  
    return (
      <div className="flex items-center justify-center">
        <div className="text-center">
            <div className="text-xl font-mono text-white bg-gray-800 py-3 px-6 rounded-lg font-semibold">
                {formatTime(timeLeft)}
            </div>
        </div>
      </div>
    );
}

export default CountdownTimer