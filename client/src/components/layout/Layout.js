import React from 'react';
import * as S from './Layout.style';
import { SideNav } from 'components/side-nav';
import { TasksPage } from 'components/tasks-page';

const Layout = () => {
  return (
    <S.Layout>
      <S.Aside>
        <SideNav />
      </S.Aside>
      <S.Main>
        <TasksPage />
      </S.Main>
    </S.Layout>
  );
};

export default Layout;
