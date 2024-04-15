'use client';

import { useState } from 'react';
import styled from 'styled-components';
import { IcLogo } from '../../../public/assets/icons';
import SendPushNotificationModal from '../Components/SendPushNotificationModal';
import Video from 'next-video';
import demo from 'https://peacewatcher.s3.ap-northeast-2.amazonaws.com/demo.mp4';
import { truncate } from 'fs';

function HomePage() {
  const [timer, setTimer] = useState('00:00:00');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const currentTimer = () => {
    const date = new Date();
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    setTimer(`${hours}:${minutes}:${seconds}`);
  };

  const startTimer = () => {
    setInterval(currentTimer, 1000);
  };

  const today = new Date();
  const formattedDate = `${today.getFullYear()}년 ${today.getMonth() + 1}월 ${today.getDate()}일`;
  // 원하는 형식으로 날짜를 설정합니다.

  startTimer();

  return (
    <StMain>
      <StAside
        onClick={() => {
          console.log(isModalOpen);
          setIsModalOpen(true);
        }}
      >
        <IcLogo />
        <StMenuWrapper>
          <button type="button">DashBoard</button>
          <button type="button">Operation Tools</button>
        </StMenuWrapper>
      </StAside>

      <div>
        <StHeader>
          <h1>CCTV 관리자 : 김관리</h1>
          <time>
            {formattedDate} {timer}
          </time>
        </StHeader>

        <StVideoWrapper>
          <Video autoPlay={true} loop={false} controls={false} src={demo} />
          <StCallPolice>
            <button type="button">경찰연동</button>
            <button type="button">
              수동으로 <br />
              푸시알림 보내기
            </button>
          </StCallPolice>
        </StVideoWrapper>
      </div>
      {isModalOpen ? (
        <SendPushNotificationModal
          isOpen={isModalOpen}
          setIsOpen={setIsModalOpen}
        />
      ) : null}
    </StMain>
  );
}

const StMain = styled.main`
  display: flex;
  width: 100vw;
  height: 100vh;

  > div {
    display: flex;
    flex-direction: column;
    width: 100%;
  }
`;

const StHeader = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;

  height: 6rem;
  padding: 2rem;

  > h1 {
    font-size: 2rem;
  }

  > time {
    font-size: 2rem;
  }
`;

const StAside = styled.aside`
  display: flex;
  flex-direction: column;
  align-items: center;

  width: 20rem;
  height: 100%;
  padding-top: 3rem;
  background-color: #2f323a;
`;

const StMenuWrapper = styled.section`
  display: flex;
  flex-direction: column;

  width: 100%;
  margin-top: 2rem;

  > button {
    border: none;
    width: 100%;
    height: 5rem;

    font-size: 2rem;

    color: #fff;
    background-color: transparent;
  }

  > button:nth-of-type(1) {
    background-color: #ff4d4f;
  }
`;

const StVideoWrapper = styled.div`
  display: flex;
  position: relative;
  width: calc(100-8rem);
  height: 91.5%;
`;

const StCallPolice = styled.aside`
  width: 12rem;
  height: 25rem;
  position: absolute;
  right: 0;

  > button {
    width: 100%;
    height: 50%;
    border: 3px solid #2f323a;

    font-size: 1.7rem;

    background-color: #fff;
    color: black;
  }
`;

export default HomePage;
