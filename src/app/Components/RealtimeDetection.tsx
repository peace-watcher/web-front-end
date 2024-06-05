// components/RealTimeDetection.tsx

import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';

interface RealTimeDetectionProps {
  isModalOpen?: boolean;
  setIsModalOpen: (isOpen: boolean) => void;
}
const RealTimeDetection: React.FC<RealTimeDetectionProps> = ({
  setIsModalOpen,
}) => {
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

      // 특정 조건 충족 시 모달 창을 띄움
      if (
        event.data.includes('knife') ||
        event.data.includes('fallen person') ||
        event.data.includes('fork') ||
        event.data.includes('person running away')
      ) {
        setIsModalOpen(true);
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
    canvas.width = 640;
    canvas.height = 480;
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
    <StWrapper>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <StImage
        id="outputElement"
        ref={imgRef}
        style={{ border: '1px solid black' }}
        alt="Real-time detection result"
      />
      <StVideo
        id="videoElement"
        ref={videoRef}
        width="640"
        height="480"
        style={{ border: '1px solid black' }}
        autoPlay
      />
    </StWrapper>
  );
};

export default RealTimeDetection;

const StWrapper = styled.div`
  padding: 5rem 5rem 5rem 10rem;
`;
const StVideo = styled.video`
  /* visibility: hidden; */
`;

const StImage = styled.img`
  width: 80%;
  height: auto;
  /* height: 480px; */
  margin-bottom: 30rem;
`;
