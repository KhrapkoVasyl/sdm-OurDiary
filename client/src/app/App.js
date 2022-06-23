import * as S from './App.style';
import { useState } from 'react';
import { Router } from 'components/router';

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
      </Popup>*/}
      <Router />
    </S.AppContainer>
  );
};

export default App;
