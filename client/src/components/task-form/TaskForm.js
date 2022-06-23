import React from 'react';
import { useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { TASK_FORM_MODES } from 'constants/popup-modes';
import { selectTaskToEdit, useTasksActions } from 'features/tasks/tasksSlice';
import { useGlobalActions } from 'features/global/globalSlice';

const TaskForm = () => {
  const taskFormMode = useSelector((state) => state.global.taskFormMode);
  const taskToEdit = useSelector(selectTaskToEdit);
  const { addNewTask, updateTask } = useTasksActions();
  const { setIsPopupOpen } = useGlobalActions();

  const defaultValues = taskToEdit
    ? {
        title: taskToEdit.title,
        description: taskToEdit.description,
        deadline: new Date(taskToEdit.deadline).toISOString().slice(0, 10),
      }
    : {};

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues });

  const onSubmit = (data) => {
    if (taskFormMode === TASK_FORM_MODES.EDIT) {
      const editedTask = {
        ...taskToEdit,
        deadline: new Date(data.deadline).toString(),
        title: data.title,
        description: data.description,
      };

      updateTask({ id: taskToEdit.id, editedTask });
      setIsPopupOpen(false);
      return;
    }

    const task = {
      ...data,
      deadline: data.deadline.toString(),
      isDone: false,
      doneDate: null,
      id: Math.random() + Date.now(),
    };

    addNewTask(task);
    setIsPopupOpen(false);
    console.log('Created', task);
  };

  return (
    <>
      <h2>
        {taskFormMode === TASK_FORM_MODES.CREATE ? 'Add New Task' : 'Edit Task'}
      </h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          type="text"
          placeholder="Title"
          {...register('title', { required: true })}
        />
        <input
          type="text"
          placeholder="Description (optional)"
          {...register('description')}
        />
        <input type="date" {...register('deadline')} />
        <button type="submit">Save</button>
      </form>
      {errors.title && <p>Title is required</p>}
    </>
  );
};

export default TaskForm;
