import { tasksActions, tasksReducer } from './tasksSlice';
import { formatDateToISO } from 'utils/fortmatDateToISO';

describe('global reducer', () => {
  it('should handle initial state', () => {
    const initialState = {
      tasks: [],
      taskToEdit: null,
    };
    expect(tasksReducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  it('should add new task', () => {
    const initialState = {
      tasks: [],
      taskToEdit: null,
    };
    const actual = tasksReducer(
      initialState,
      tasksActions.addTask({
        title: 'Task 4',
        id: 4,
        description: 'Some stupid text',
        isDone: false,
        deadline: '2022-02-11',
        doneDate: null,
      })
    );

    expect(actual.tasks).toEqual([
      {
        title: 'Task 4',
        id: 4,
        description: 'Some stupid text',
        isDone: false,
        deadline: '2022-02-11',
        doneDate: null,
      },
    ]);
  });

  it('should remove task by id', () => {
    const initialState = {
      tasks: [
        {
          title: 'Task 4',
          id: 4,
          description: 'Some stupid text',
          isDone: false,
          deadline: '2022-02-11',
          doneDate: null,
        },
      ],
      taskToEdit: null,
    };
    const actual = tasksReducer(initialState, tasksActions.deleteTask(4));

    expect(actual.tasks).toEqual([]);
  });

  it('should update task by id', () => {
    const initialState = {
      tasks: [
        {
          title: 'Task 4',
          id: 4,
          description: 'Some stupid text',
          isDone: false,
          deadline: '2022-02-11',
          doneDate: null,
        },
      ],
      taskToEdit: null,
    };
    const actual = tasksReducer(
      initialState,
      tasksActions.updateTask({
        id: 4,
        editedTask: {
          title: 'Task 5',
          id: 4,
          description: 'Some stupid text',
          isDone: false,
          deadline: '2022-02-11',
          doneDate: null,
        },
      })
    );

    expect(actual.tasks).toEqual([
      {
        title: 'Task 5',
        id: 4,
        description: 'Some stupid text',
        isDone: false,
        deadline: '2022-02-11',
        doneDate: null,
      },
    ]);
  });

  it('should toggle task by id', () => {
    const initialState = {
      tasks: [
        {
          title: 'Task 4',
          id: 4,
          description: 'Some stupid text',
          isDone: false,
          deadline: '2022-02-11',
          doneDate: null,
        },
      ],
      taskToEdit: null,
    };
    const actual = tasksReducer(
      initialState,
      tasksActions.toggleTask({ id: 4 })
    );

    expect(actual.tasks).toEqual([
      {
        title: 'Task 4',
        id: 4,
        description: 'Some stupid text',
        isDone: true,
        deadline: '2022-02-11',
        doneDate: formatDateToISO(new Date().toISOString()),
      },
    ]);
  });
});
