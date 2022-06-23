import { POPUP_MODES } from 'constants/popup-modes';
import { useGlobalActions } from 'features/global/globalSlice';
import React from 'react';
import { FaTrashAlt, FaRegEdit } from 'react-icons/fa';
import * as S from './Task.style';

const Task = ({
  title,
  description,
  isDone,
  deadline,
  doneDate,
  toggleTask,
}) => {
  const { setPopupMode, setIsPopupOpen } = useGlobalActions();
  const onEditButtonClickHandler = (id) => {
    setPopupMode(POPUP_MODES.EDIT);
    setIsPopupOpen(true);
  };

  return (
    <tr>
      <td>
        <S.Checkbox type="checkbox" checked={isDone} onChange={() => {}} />
      </td>
      <td>
        <S.Title>{title}</S.Title>
        <S.Description>{description}</S.Description>
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
