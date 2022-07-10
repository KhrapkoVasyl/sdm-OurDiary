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

const SideNav = () => {
  const { setIsPopupOpen, setTaskFormMode } = useGlobalActions();
  const theme = useTheme();
  const navItemsProps = useMemo(
    () => [
      {
        icon: <FaTasks />,
        text: 'All Tasks',
        to: '/tasks',
        color: theme.colorPrimary,
      },
      {
        icon: <IoMdDoneAll />,
        text: 'Completed',
        to: '/tasks?isDone=true',
        color: theme.colorSuccess,
      },
      {
        icon: <MdOutlineSchedule />,
        text: 'To Do',
        to: '/tasks?isDone=false',
        color: theme.colorWarning,
      },
      {
        icon: <FaCalendarTimes />,
        text: 'Overdue',
        to: '/tasks?isDone=false&overdue=true',
        color: theme.colorError,
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
        {navItemsProps.map(({ text, icon, to, color }) => {
          return (
            <SideNavItem
              key={text}
              text={text}
              icon={icon}
              color={color}
              to={to}
            />
          );
        })}
      </S.NavList>
    </S.Container>
  );
};

export default SideNav;
