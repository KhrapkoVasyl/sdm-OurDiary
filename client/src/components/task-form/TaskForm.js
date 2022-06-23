import React from 'react';
import { useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { POPUP_MODES } from 'constants/popup-modes';

const AddTaskForm = () => {
  const popupMode = useSelector((state) => state.global.popupMode);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    if (popupMode === POPUP_MODES.EDIT) {
      console.log('Edited', data);
      return;
    }

    console.log('Created', data);
  };

  return (
    <>
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
        <input type="date" {...register('date')} />
        <button type="submit">Save</button>
      </form>
      {errors.title && <p>Title is required</p>}
    </>
  );
};

export default AddTaskForm;
