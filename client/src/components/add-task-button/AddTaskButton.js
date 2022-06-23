import React from 'react';
import * as S from './AddTaskButton.style';

const AddTaskButton = ({ onClick }) => {
  return (
    <S.Button onClick={onClick}>
      <S.AddIcon />
      <p>Add New Task</p>
    </S.Button>
  );
};

export default AddTaskButton;
