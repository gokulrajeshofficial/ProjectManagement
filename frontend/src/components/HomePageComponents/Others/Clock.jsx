import React, { useState, useEffect } from 'react';
import moment from 'moment';

const Clock = () => {
  const [currentTime, setCurrentTime] = useState(moment().format('MMMM Do YYYY, h:mm:ss a'));
  const [curretDay , setCurretDay ] = useState(moment().format('dddd'))
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(moment().format('MMMM Do YYYY, h:mm:ss a'));
      setCurretDay(moment().format('dddd'))
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <h1 className='text-center text-xl'>It's {curretDay} </h1>
      <p>{currentTime}</p>
    </div>
  );
};

export default Clock;