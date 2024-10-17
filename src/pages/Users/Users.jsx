// src/pages/Users.js
import React from 'react';

import TabsNav from '../../components/TabsNav/TabsNav';
import UsersTable from '../../components/UsersTable/UsersTable';

export  const Users = () => {
  var WebApp = window.Telegram.WebApp;
  console.log(WebApp.initData)
  return (
    <div>
    <TabsNav/>
      <h1>Users</h1>
      <UsersTable />
    </div>
  );
}
