import React from 'react';
import { useSelector } from 'react-redux';

const AddTaskForm = () => {
  const popupMode = useSelector((state) => state.global.popupMode);

  return (
    <form action="">
      <input type="text" placeholder="Title" required />
      <input type="text" placeholder="Description (optional)" />
      <input type="date" />
      <button type="submit">Save</button>
    </form>
  );
};

export default AddTaskForm;
