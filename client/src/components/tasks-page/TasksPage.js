import * as S from './TasksPage.style';
import { FaTasks } from 'react-icons/fa';
import { useTheme } from 'styled-components';
import { RemoveAllButton } from 'components/remove-all-button';
import { TaskList } from 'components/tasks-list';

const TasksPage = ({ title, titleIconColor }) => {
  const theme = useTheme();
  const tasks = [
    {
      title: 'Task 1',
      id: 1,
      description: 'some stupid text',
      isDone: true,
      deadline: new Date().toLocaleDateString(),
      doneDate: new Date().toLocaleDateString(),
    },
    {
      title: 'Task 2',
      id: 2,
      description: 'Some stupid text',
      isDone: false,
      deadline: new Date().toLocaleDateString(),
      doneDate: null,
    },
    {
      title: 'Task 3',
      id: 3,
      description: 'some stupid text',
      isDone: false,
      deadline: new Date().toLocaleDateString(),
      doneDate: null,
    },
    {
      title: 'Task 1',
      id: 1,
      description: 'some stupid text',
      isDone: true,
      deadline: new Date().toLocaleDateString(),
      doneDate: new Date().toLocaleDateString(),
    },
    {
      title: 'Task 2',
      id: 2,
      description: 'Some stupid text',
      isDone: false,
      deadline: new Date().toLocaleDateString(),
      doneDate: null,
    },
    {
      title: 'Task 3',
      id: 3,
      description: 'some stupid text',
      isDone: false,
      deadline: new Date().toLocaleDateString(),
      doneDate: null,
    },
    {
      title: 'Task 1',
      id: 1,
      description: 'some stupid text',
      isDone: true,
      deadline: new Date().toLocaleDateString(),
      doneDate: new Date().toLocaleDateString(),
    },
    {
      title: 'Task 2',
      id: 2,
      description: 'Some stupid text',
      isDone: false,
      deadline: new Date().toLocaleDateString(),
      doneDate: null,
    },
    {
      title: 'Task 3',
      id: 3,
      description: 'some stupid text',
      isDone: false,
      deadline: new Date().toLocaleDateString(),
      doneDate: null,
    },
    {
      title: 'Task 1',
      id: 1,
      description: 'some stupid text',
      isDone: true,
      deadline: new Date().toLocaleDateString(),
      doneDate: new Date().toLocaleDateString(),
    },
    {
      title: 'Task 2',
      id: 2,
      description: 'Some stupid text',
      isDone: false,
      deadline: new Date().toLocaleDateString(),
      doneDate: null,
    },
    {
      title: 'Task 3',
      id: 3,
      description: 'some stupid text',
      isDone: false,
      deadline: new Date().toLocaleDateString(),
      doneDate: null,
    },
  ];

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
      <S.TotalTasks>Total: 12</S.TotalTasks>
    </S.Container>
  );
};

export default TasksPage;
