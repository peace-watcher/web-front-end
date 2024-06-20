'use client';

import { useEffect } from 'react';
import { postPushNotificationTrigger } from '../api/postPushNotificationTrigger';
import styled from 'styled-components';
// import { IcDeleteModal } from '../../../public/assets/icons';

export interface AddCategoryModalProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export default function SendPushNotificationModal(
  props: AddCategoryModalProps,
) {
  const { isOpen, setIsOpen } = props;

  const handlePushAgreement = async () => {
    const result = await postPushNotificationTrigger();
    console.log(result);
    setIsOpen(false);
  };

  // useEffect(() => {
  //   if (isOpen) {
  //     const timer = setTimeout(() => {
  //       handlePushAgreement();
  //     }, 2000);

  //     // 타이머를 정리하는 클린업 함수
  //     return () => clearTimeout(timer);
  //   }
  // }, [isOpen]);

  return isOpen ? (
    <>
      <StWrapper>
        <StModal>
          <StModalHeader>
            <h1>{'흉기난동이 감지되었습니다'}</h1>

            <button onClick={() => setIsOpen(false)}>x</button>
          </StModalHeader>

          <p>흉기난동이 감지되었습니다. 조치가 필요합니다.</p>

          <StButtonWrapper>
            <button type="button" onClick={() => handlePushAgreement()}>
              푸시 알림 <br /> 보낼래요{' '}
            </button>
            <button type="button" onClick={() => setIsOpen(false)}>
              일단 <br /> 지켜볼래요{' '}
            </button>
          </StButtonWrapper>
        </StModal>
      </StWrapper>
    </>
  ) : null;
}

const StWrapper = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  width: 100%;
  height: 100%;

  background-color: rgba(36, 36, 36, 0.4);
  z-index: 3;
`;

const StModal = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: absolute;

  padding: 4rem 5rem 4.4rem 4rem;

  width: 45rem;
  height: 27rem;

  border-radius: 2.6rem;

  > svg {
    position: absolute;
    right: 4rem;
    top: 4rem;

    cursor: pointer;
  }

  background-color: #fff;
`;

const StModalHeader = styled.header`
  display: flex;
  margin-bottom: 3rem;
  position: relative;

  > h1 {
    width: 100%;
  }

  > button {
    position: absolute;
    top: -2rem;
    right: -9rem;
    background: none;
    border: none;
    cursor: pointer;
  }
`;

const StButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  gap: 2rem;
  margin-top: 1.5rem;
  > button {
    border-radius: 1rem;
    border: none;
    width: 9rem;
    height: 9rem;
    color: #fff;

    background-color: black;
  }

  > button:nth-of-type(1) {
    background-color: red;
  }
`;
