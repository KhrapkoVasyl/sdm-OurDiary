import React from 'react';
import * as S from './Layout.style';
import { SideNav } from 'components/side-nav';
import { TasksPage } from 'pages/tasks-page';
import { Popup } from 'components/popup';
import { useSelector } from 'react-redux';
import { TaskForm } from 'components/task-form';

const Layout = () => {
  const isPopupOpen = useSelector((state) => state.global.isPopupOpen);

  return (
    <S.Layout>
      <Popup isOpen={isPopupOpen}>
        <TaskForm />
      </Popup>
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
