import * as S from './TasksPage.style';
import { FaTasks } from 'react-icons/fa';
import { useTheme } from 'styled-components';
import { RemoveAllButton } from 'components/remove-all-button';
import { TaskList } from 'components/tasks-list';
import { useSelector } from 'react-redux';
import { selectTasks } from 'features/tasks/tasksSlice';

const TasksPage = ({ title, titleIconColor }) => {
  const tasks = useSelector(selectTasks);
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
      <TaskList tasks={tasks} />
      <S.TotalTasks>Total: {tasks.length}</S.TotalTasks>
    </S.Container>
  );
};

export default TasksPage;
