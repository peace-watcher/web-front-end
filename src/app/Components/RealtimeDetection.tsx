// components/RealTimeDetection.tsx

import React, { useEffect, useRef } from 'react';

const RealTimeDetection: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const wsRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    const ws = new WebSocket('ws://107.167.183.252:8000/ws');
    wsRef.current = ws;

    ws.onopen = () => {
      console.log('WebSocket is open now.');
      startVideo();
    };

    ws.onmessage = (event) => {
      if (imgRef.current) {
        imgRef.current.src = 'data:image/jpeg;base64,' + event.data;
      }
    };

    ws.onclose = () => {
      console.log('WebSocket is closed now.');
    };

    ws.onerror = (error) => {
      console.log('WebSocket Error: ' + error);
    };

    return () => {
      ws.close();
    };
  }, []);

  const startVideo = () => {
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((stream) => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.play();
          videoRef.current.onloadedmetadata = () => {
            console.log('Video metadata loaded');
            sendFrame();
          };
        }
      })
      .catch((err) => {
        console.log('An error occurred: ' + err);
      });
  };

  const sendFrame = () => {
    const canvas = document.createElement('canvas');
    canvas.width = 320;
    canvas.height = 240;
    const context = canvas.getContext('2d');

    let frameCount = 0;
    const frameRate = 3;

    const captureFrame = () => {
      if (context && videoRef.current) {
        if (frameCount % Math.floor(30 / frameRate) === 0) {
          context.drawImage(
            videoRef.current,
            0,
            0,
            canvas.width,
            canvas.height,
          );
          const dataUrl = canvas.toDataURL('image/jpeg', 0.5);
          const data = dataUrl.split(',')[1];

          console.log('Captured frame length:', data.length);

          if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
            wsRef.current.send(data);
          }
        }
        frameCount++;
        requestAnimationFrame(captureFrame);
      }
    };

    captureFrame();
  };

  return (
    <div>
      <video
        id="videoElement"
        ref={videoRef}
        width="640"
        height="480"
        style={{ border: '1px solid black' }}
        autoPlay
      ></video>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        id="outputElement"
        ref={imgRef}
        width="640"
        height="480"
        style={{ border: '1px solid black' }}
        alt="Real-time detection result"
      />
    </div>
  );
};

export default RealTimeDetection;
