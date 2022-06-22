import * as S from './TasksPage.style';
import { FaTasks } from 'react-icons/fa';
import { useTheme } from 'styled-components';
import { RemoveAllButton } from 'components/remove-all-button';

const TasksPage = ({ title, titleIconColor }) => {
  const theme = useTheme();

  return (
    <S.Container>
      <S.PageHead>
        <S.Title iconColor={theme.colorPrimary}>
          <FaTasks />
          All Tasks
        </S.Title>
        <RemoveAllButton />
      </S.PageHead>
    </S.Container>
  );
};

export default TasksPage;
