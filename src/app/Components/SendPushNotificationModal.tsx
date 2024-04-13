'use client';

import styled from 'styled-components';
import { IcDeleteModal } from '../../../public/assets/icons';

export interface AddCategoryModalProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export default function SendPushNotificationModal(
  props: AddCategoryModalProps,
) {
  const { isOpen, setIsOpen } = props;

  return isOpen ? (
    <>
      <StWrapper>
        <StModal>
          <StModalHeader>
            <h1>{'흉기난동이 감지되었습니다'}</h1>

            <button onClick={() => setIsOpen(false)}>
              <IcDeleteModal />
            </button>
          </StModalHeader>

          <p>
            어쩌구저쩌구어쩌꾸 지금 개 위험해 어떤 미친놈이 칼들고 돌아다님;;;;
            어쩌구저쩌구어쩌꾸 지금 개 위험해 어떤 미친놈이 칼들고 돌아다님;;;;
            어쩌구저쩌구어쩌꾸 지금 개 위험해 어떤 미친놈이 칼들고 돌아다님;;;;
          </p>

          <StButtonWrapper>
            <button type="button" onClick={() => setIsOpen(false)}>
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

  >button: nth-of-type(1) {
    background-color: red;
  }
`;
