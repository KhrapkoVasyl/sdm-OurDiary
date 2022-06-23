import { TASK_FORM_MODES } from 'constants/popup-modes';
import { useGlobalActions } from 'features/global/globalSlice';
import { useTasksActions } from 'features/tasks/tasksSlice';
import React from 'react';
import { FaTrashAlt, FaRegEdit } from 'react-icons/fa';
import * as S from './Task.style';

const Task = ({ id, title, description, isDone, deadline, doneDate }) => {
  const { setTaskFormMode, setIsPopupOpen } = useGlobalActions();
  const { toggleTask } = useTasksActions();
  const onEditButtonClickHandler = (id) => {
    setTaskFormMode(TASK_FORM_MODES.EDIT);
    setIsPopupOpen(true);
  };

  const onTaskToggleHandler = (e) => {
    toggleTask({ id, isDone: e.target.value });
  };

  return (
    <tr>
      <td>
        <S.Checkbox
          type="checkbox"
          checked={isDone}
          onChange={onTaskToggleHandler}
        />
      </td>
      <td>
        <S.Title>{title}</S.Title>
        <S.Description>
          {description ? description : 'No description'}
        </S.Description>
      </td>
      <td>
        <S.Date>{deadline}</S.Date>
      </td>
      <td>{doneDate && <S.Date>{doneDate}</S.Date>}</td>
      <td>
        <S.DeleteButton>
          <FaTrashAlt />
        </S.DeleteButton>
      </td>
      <td>
        <S.EditButton onClick={onEditButtonClickHandler.bind(null, 1)}>
          <FaRegEdit />
        </S.EditButton>
      </td>
    </tr>
  );
};

export default Task;
