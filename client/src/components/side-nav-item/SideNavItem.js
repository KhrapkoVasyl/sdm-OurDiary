import React from 'react';
import * as S from './SideNavItem.style';
import { NavLink, useLocation } from 'react-router-dom';

const SideNavItem = ({ icon, text, color, onClick, to }) => {
  const { pathname, search } = useLocation();
  const isLinkActive = to === pathname + search;

  return (
    <NavLink to={to} style={{ textDecoration: 'none' }}>
      <S.NavItem
        color={color}
        onClick={onClick}
        className={isLinkActive ? 'active' : ''}
      >
        <S.IconWrapper>{icon}</S.IconWrapper>
        <p>{text}</p>
      </S.NavItem>
    </NavLink>
  );
};

export default SideNavItem;
