import React, { useEffect, useRef } from 'react';

const AnimatedStars = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    const setCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    setCanvasSize();

    // Create an array to store star objects
    const stars = [];
    const numStars = 200; // Number of stars
    const colors = ['#ffffff', '#ffe9c4', '#d4fbff']; // Star colors

    console.log('Creating stars...');

    // Correctly define star inside the loop
    for (let i = 0; i < numStars; i++) {
      const star = {
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 5 + 1,  // Increase the radius for better visibility (1 to 5)
        color: colors[Math.floor(Math.random() * colors.length)],
        velocity: Math.random() * 0.5,
      };
      stars.push(star);
    }

    // Log the first few stars to ensure they are being created
    console.log('Stars:', stars.slice(0, 5)); 

    const drawStar = (star) => {
      ctx.beginPath();
      ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
      ctx.fillStyle = star.color;
      ctx.fill();
    
      console.log(`Drawing star at (${star.x}, ${star.y}) with radius ${star.radius}`); // Log each star's drawing
    };
    

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      stars.forEach((star) => {
        drawStar(star);
        star.y += star.velocity; // Move star downward
        if (star.y > canvas.height) star.y = 0; // Reset position when out of view
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      setCanvasSize();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: -1 }}
    />
  );
  
  
};

export default AnimatedStars;

