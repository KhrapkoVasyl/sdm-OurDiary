import * as S from './App.style';
import { Router } from 'components/router';
import { useSelector } from 'react-redux';
import { Popup } from 'components/popup';
import { AddTaskForm } from 'components/add-task-form';
import { POPUP_MODES } from 'constants/popup-modes';

const App = () => {
  const isPopupOpen = useSelector((state) => state.global.isPopupOpen);
  const popupMode = useSelector((state) => state.global.popupMode);

  return (
    <S.AppContainer>
      <Popup
        title={popupMode === POPUP_MODES.CREATE ? 'Add New Task' : 'Edit Task'}
        isOpen={isPopupOpen}
      >
        <AddTaskForm />
      </Popup>
      <Router />
    </S.AppContainer>
  );
};

export default App;
