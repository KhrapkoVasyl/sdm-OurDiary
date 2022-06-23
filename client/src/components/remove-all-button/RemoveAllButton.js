import React from 'react';
import { FaTrashAlt } from 'react-icons/fa';
import * as S from './RemoveAllButton.style';

const RemoveAllButton = ({ onClick }) => {
  return (
    <S.Button onClick={onClick}>
      <S.IconWrapper>
        <S.TrashIcon />
      </S.IconWrapper>
      <p>Remove All</p>
    </S.Button>
  );
};

export default RemoveAllButton;
