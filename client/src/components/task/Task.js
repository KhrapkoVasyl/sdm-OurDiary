import React from 'react';
import { TASK_FORM_MODES } from 'constants/popup-modes';
import { useGlobalActions } from 'features/global/globalSlice';
import { useTasksActions } from 'features/tasks/tasksSlice';
import { FaTrashAlt, FaRegEdit } from 'react-icons/fa';
import * as S from './Task.style';
import { toggleTask } from 'features/tasks/tasks.thunk';
import { useDispatch } from 'react-redux';

const Task = ({ id, title, description, isDone, deadline, doneDate }) => {
  const { setTaskFormMode, setIsPopupOpen } = useGlobalActions();
  const { deleteTask, setTaskToEdit } = useTasksActions();
  const dispatch = useDispatch();
  const onEditClickHandler = () => {
    if (isDone) return;
    setTaskFormMode(TASK_FORM_MODES.EDIT);
    setIsPopupOpen(true);
    setTaskToEdit(id);
  };

  const onTaskToggleHandler = (e) => {
    if (isDone) return;
    dispatch(toggleTask(id));
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
