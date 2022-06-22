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
        <S.EditButton>
          <FaRegEdit />
        </S.EditButton>
      </td>
    </tr>
  );
};

export default Task;
