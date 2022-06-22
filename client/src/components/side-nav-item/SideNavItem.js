import React from 'react';
import * as S from './SideNavItem.style';

const SideNavItem = ({ icon, text, to, color }) => {
  return (
    <S.NavItem color={color}>
      <S.IconWrapper>{icon}</S.IconWrapper>
      <p>{text}</p>
    </S.NavItem>
  );
};

export default SideNavItem;
