// src/components/TabsNav.js
import React from 'react';
import { Tabs, Tab } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';

export default function TabsNav() {
  const location = useLocation();
  const currentTab = location.pathname;

  return (
    <Tabs value={currentTab} centered>
      <Tab label="Users" value="/users" component={Link} to="/users" />
      <Tab label="Leaderboard" value="/leaderboard" component={Link} to="/leaderboard" />
      <Tab label="Tasks" value="/tasks" component={Link} to="/tasks" />

    </Tabs>
  );
}
