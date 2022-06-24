import React from 'react';
import * as S from './SideNavItem.style';

const SideNavItem = ({ icon, text, color, onClick }) => {
  return (
    <S.NavItem color={color} onClick={onClick}>
      <S.IconWrapper>{icon}</S.IconWrapper>
      <p>{text}</p>
    </S.NavItem>
  );
};

export default SideNavItem;
