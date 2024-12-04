'use client'
import { useState, useEffect } from "react";

// const useCountdown = (endDate) => {
//   const calculateTimeLeft = () => {
//     const now = new Date();
//     const targetDate = new Date(endDate);
//     const difference = targetDate - now;

//     if (difference <= 0) return null; // Time is up

//     const days = Math.floor(difference / (1000 * 60 * 60 * 24));
//     const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
//     const minutes = Math.floor((difference / (1000 * 60)) % 60);
//     const seconds = Math.floor((difference / 1000) % 60);

//     return { days, hours, minutes, seconds };
//   };

//   const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

//   useEffect(() => {
//     const timer = setInterval(() => {
//       setTimeLeft(calculateTimeLeft());
//     }, 1000);

//     return () => clearInterval(timer); // Cleanup on unmount
//   }, [endDate]);

//   return timeLeft;
// };

// export default useCountdown;
const useCountdowns = (endDates) => {
    const calculateTimeLeft = (date) => {
      const now = new Date();
      const targetDate = new Date(date);
      const difference = targetDate - now;
  
      if (difference <= 0) return null;
  
      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((difference / (1000 * 60)) % 60);
      const seconds = Math.floor((difference / 1000) % 60);
  
      return { days, hours, minutes, seconds };
    };
  
    const [timeLeftArray, setTimeLeftArray] = useState(
      endDates.map(calculateTimeLeft)
    );
  
    useEffect(() => {
      const timer = setInterval(() => {
        setTimeLeftArray(endDates.map(calculateTimeLeft));
      }, 1000);
  
      return () => clearInterval(timer);
    }, [endDates]);
  
    return timeLeftArray;
  };
  
  export default useCountdowns;
  