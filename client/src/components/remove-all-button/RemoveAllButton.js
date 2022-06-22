import React from 'react';
import { FaTrashAlt } from 'react-icons/fa';
import * as S from './RemoveAllButton.style';

const RemoveAllButton = () => {
  return (
    <S.Button>
      <S.IconWrapper>
        <S.TrashIcon />
      </S.IconWrapper>
      <p>Remove All</p>
    </S.Button>
  );
};

export default RemoveAllButton;
