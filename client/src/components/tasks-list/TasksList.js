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
              <th style={{ width: '10%' }}></th>
              <th style={{ width: '50%' }}></th>
              <th style={{ width: '15%' }}>Due to</th>
              <th style={{ width: '15%' }}>Done at</th>
              <th style={{ width: '5%' }}></th>
              <th style={{ width: '5%' }}></th>
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
