// src/pages/Users.js
import React from 'react';
import TabsNav from '../../components/TabsNav/TabsNav';
import TasksTable from '../../components/TasksTable/TasksTable';

export  const Tasks = () => {
  return (
    <div>
    <TabsNav/>
      <h1>Tasks</h1>
    <TasksTable/>
    </div>
  );
}
