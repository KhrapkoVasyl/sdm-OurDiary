import * as S from './App.style';
import { Layout } from 'components/layout';
import { Popup } from 'components/popup';
import { AddTaskForm } from 'components/add-task-form';
import { useState } from 'react';
import { SignInPage } from 'pages/sign-in-page';
import { SignUpPage } from 'pages/sign-up-page';

const App = () => {
  const [modalIsOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <S.AppContainer>
      {/* <Popup
        title={'Add new Task'}
        openModal={openModal}
        closeModal={closeModal}
        isOpen={modalIsOpen}
      >
        <AddTaskForm />
      </Popup>
      <Layout /> */}
      <SignInPage />
      <SignUpPage />
    </S.AppContainer>
  );
};

export default App;
