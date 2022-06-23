import Task from 'components/task/Task';
import React from 'react';
import * as S from './TasksList.style';

const TasksList = ({ tasks }) => {
  return (
    <>
      <S.TableContainer>
        <S.Table>
          <S.TableHead>
            <tr>
              <th></th>
              <th></th>
              <th>Due to</th>
              <th>Done at</th>
              <th></th>
              <th></th>
            </tr>
          </S.TableHead>
          <tbody>
            {tasks.map((task) => {
              return (
                <Task
                  key={task.id * Math.random()}
                  id={task.id}
                  title={task.title}
                  description={task.description}
                  isDone={task.isDone}
                  deadline={task.deadline}
                  doneDate={task.doneDate}
                />
              );
            })}
          </tbody>
        </S.Table>
      </S.TableContainer>
    </>
  );
};

export default TasksList;
