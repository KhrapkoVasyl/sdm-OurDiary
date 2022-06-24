import React from 'react';
import { TASK_FORM_MODES } from 'constants/popup-modes';
import { useGlobalActions } from 'features/global/globalSlice';
import { useTasksActions } from 'features/tasks/tasksSlice';
import { FaTrashAlt, FaRegEdit } from 'react-icons/fa';
import * as S from './Task.style';

const Task = ({ id, title, description, isDone, deadline, doneDate }) => {
  const { setTaskFormMode, setIsPopupOpen } = useGlobalActions();
  const { toggleTask, deleteTask, setTaskToEdit } = useTasksActions();
  const onEditClickHandler = () => {
    setTaskFormMode(TASK_FORM_MODES.EDIT);
    setIsPopupOpen(true);
    setTaskToEdit(id);
  };

  const onTaskToggleHandler = (e) => {
    if (isDone) return;
    toggleTask({ id, isDone: e.target.value });
  };

  const onDeleteClickHandler = () => {
    deleteTask(id);
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
        <S.Date>
          {deadline ? new Date(deadline).toLocaleDateString() : <>&mdash;</>}
        </S.Date>
      </td>
      <td>
        {doneDate ? (
          <S.Date>{new Date(doneDate).toLocaleDateString()}</S.Date>
        ) : (
          <>&mdash;</>
        )}
      </td>
      <td>
        <S.DeleteButton onClick={onDeleteClickHandler}>
          <FaTrashAlt />
        </S.DeleteButton>
      </td>
      <td>
        <S.EditButton onClick={onEditClickHandler}>
          <FaRegEdit />
        </S.EditButton>
      </td>
    </tr>
  );
};

export default Task;