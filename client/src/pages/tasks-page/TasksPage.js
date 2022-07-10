import * as S from './TasksPage.style';
import { FaTasks } from 'react-icons/fa';
import { useTheme } from 'styled-components';
import { TaskList } from 'components/tasks-list';
import { useDispatch, useSelector } from 'react-redux';
import { selectTasks } from 'features/tasks/tasksSlice';
import { useEffect } from 'react';
import { getAllTasks } from 'features/tasks/tasks.thunk';
import { useSearchParams } from 'react-router-dom';
import { selectIsLoading } from 'features/global/globalSlice';

const TasksPage = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const tasks = useSelector(selectTasks);
  const isLoading = useSelector(selectIsLoading);
  const [searchParams] = useSearchParams();

  useEffect(() => {
    dispatch(getAllTasks(searchParams));
  }, [searchParams]);

  return (
    <S.Container>
      <S.PageHead>
        <S.Title iconColor={theme.colorPrimary}>
          <FaTasks />
          Tasks
        </S.Title>
      </S.PageHead>
      {!isLoading ? (
        <>
          <TaskList tasks={tasks} />
          <S.TotalTasks>Total: {tasks.length}</S.TotalTasks>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </S.Container>
  );
};

export default TasksPage;
