import * as S from './TasksPage.style';
import { FaTasks } from 'react-icons/fa';
import { useTheme } from 'styled-components';
import { RemoveAllButton } from 'components/remove-all-button';
import { TaskList } from 'components/tasks-list';
import { useDispatch, useSelector } from 'react-redux';
import { selectTasks, useTasksActions } from 'features/tasks/tasksSlice';
import { useEffect } from 'react';
import { getAllTasks } from 'features/tasks/tasks.thunk';

const TasksPage = ({ title, titleIconColor }) => {
  const tasks = useSelector(selectTasks);
  const { removeAllTasks } = useTasksActions();
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
        <RemoveAllButton onClick={() => removeAllTasks()} />
      </S.PageHead>
      <TaskList tasks={tasks} />
      <S.TotalTasks>Total: {tasks.length}</S.TotalTasks>
    </S.Container>
  );
};

export default TasksPage;
