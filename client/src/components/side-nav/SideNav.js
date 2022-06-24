import { AddTaskButton } from 'components/add-task-button';
import * as S from './SideNav.style';
import { FaTasks, FaCalendarTimes } from 'react-icons/fa';
import { IoMdDoneAll } from 'react-icons/io';
import { MdOutlineSchedule } from 'react-icons/md';
import { SideNavItem } from 'components/side-nav-item';
import { useMemo } from 'react';
import { useTheme } from 'styled-components';
import { useGlobalActions } from 'features/global/globalSlice';
import { TASK_FORM_MODES } from 'constants/popup-modes';
import { useDispatch } from 'react-redux';
import { getAllTasks, getCompletedTasks } from 'features/tasks/tasks.thunk';

const SideNav = () => {
  const dispatch = useDispatch();
  const { setIsPopupOpen, setTaskFormMode } = useGlobalActions();
  const theme = useTheme();
  const navItemsContent = useMemo(
    () => [
      {
        icon: <FaTasks />,
        text: 'All Tasks',
        to: '/tasks',
        color: theme.colorPrimary,
        onClick: () => {
          dispatch(getAllTasks());
        },
      },
      {
        icon: <IoMdDoneAll />,
        text: 'Completed',
        to: '/tasks',
        color: theme.colorSuccess,
        onClick: () => {
          dispatch(getCompletedTasks());
        },
      },
      {
        icon: <MdOutlineSchedule />,
        text: 'To Do',
        to: '/tasks',
        color: theme.colorWarning,
        onClick: () => {},
      },
      {
        icon: <FaCalendarTimes />,
        text: 'Overdue',
        to: '/tasks',
        color: theme.colorError,
        onClick: () => {},
      },
    ],
    []
  );

  const onAddTaskButtonClick = () => {
    setTaskFormMode(TASK_FORM_MODES.CREATE);
    setIsPopupOpen(true);
  };

  return (
    <S.Container>
      <AddTaskButton onClick={onAddTaskButtonClick} />
      <S.NavList>
        {navItemsContent.map(({ text, icon, to, color, onClick }) => {
          return (
            <SideNavItem
              key={text}
              text={text}
              icon={icon}
              onClick={onClick}
              color={color}
            />
          );
        })}
      </S.NavList>
    </S.Container>
  );
};

export default SideNav;
