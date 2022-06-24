import * as S from './TasksPage.style';
import { FaTasks } from 'react-icons/fa';
import { useTheme } from 'styled-components';
import { TaskList } from 'components/tasks-list';
import { useDispatch, useSelector } from 'react-redux';
import { selectTasks } from 'features/tasks/tasksSlice';
import { useEffect } from 'react';
import { getAllTasks } from 'features/tasks/tasks.thunk';

const TasksPage = () => {
  const tasks = useSelector(selectTasks);
  const theme = useTheme();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllTasks());
  }, []);

  return (
    <S.Container>
      <S.PageHead>
        <S.Title iconColor={theme.colorPrimary}>
          <FaTasks />
          Tasks
        </S.Title>
      </S.PageHead>
      <TaskList tasks={tasks} />
      <S.TotalTasks>Total: {tasks.length}</S.TotalTasks>
    </S.Container>
  );
};

export default TasksPage;
