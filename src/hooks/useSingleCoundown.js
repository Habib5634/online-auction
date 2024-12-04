'use client'
import { useState, useEffect } from "react";

const useSingleCountdown = (endDate) => {
  const calculateTimeLeft = () => {
    const now = new Date();
    const targetDate = new Date(endDate);
    const difference = targetDate - now;

    if (difference <= 0) return null; // Time is up

    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((difference / (1000 * 60)) % 60);
    const seconds = Math.floor((difference / 1000) % 60);

    return { days, hours, minutes, seconds };
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer); // Cleanup on unmount
  }, [endDate]);

  return timeLeft;
};

export default useSingleCountdown;