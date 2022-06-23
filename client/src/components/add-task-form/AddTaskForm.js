import React from 'react';
const modes = {
  create: 1,
  edit: 2,
};

const AddTaskForm = () => {
  return (
    <form action="">
      <input type="text" placeholder="Title" required />
      <input type="text" placeholder="Description (optional)" />
      <input type="date" />
      <button type="submit">Add</button>
    </form>
  );
};

export default AddTaskForm;
