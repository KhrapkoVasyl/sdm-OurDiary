import * as S from './Layout.style';
import { SideNav } from 'components/side-nav';
import { TasksPage } from 'components/tasks-page';

const Layout = () => {
  return (
    <S.Layout>
      <S.LeftSide>
        <SideNav />
      </S.LeftSide>
      <S.Main>
        <TasksPage />
      </S.Main>
    </S.Layout>
  );
};

export default Layout;
