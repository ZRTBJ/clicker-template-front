// src/pages/Users.js
import React from 'react';
import TabsNav from '../../components/TabsNav/TabsNav';
import LeaderboardTable from '../../components/LeaderboardTable/LeaderboardTable';

export  const Leaderboard = () => {
  return (
    <div>
    <TabsNav/>
      <h1>Leaderboard</h1>
      <LeaderboardTable />
    </div>
  );
}
