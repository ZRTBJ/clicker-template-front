import { Route, Routes } from 'react-router-dom';

import Layout from './components/Layout';
import BoostPage from './pages/BoostPage';
import EarnPage from './pages/EarnPage';
import EarnDetail from './components/EarnDetail';
import FriendsPage from './pages/FriendsPage';
import GamePage from './pages/GamePage';
import LeaderPage from './pages/LeaderPage';
import SquadsPage from './pages/SquadsPage';
import SquadDetail from './components/SquadDetail';
import { Users } from './pages/Users/Users';
import { Leaderboard } from './pages/Leaderboard/Leaderboard';
import { Tasks } from './pages/Tasks/Tasks';

export default function Router() {
	return (
		<Routes>
			<Route path="/users" element={<Users />} />
			<Route path="/leaderboard" element={<Leaderboard />} />
			<Route path="/tasks" element={<Tasks />} />
			<Route path='/' element={<Layout />}>
				<Route index element={<GamePage />} />
				
				<Route path='friends' element={<FriendsPage />} />
				<Route path='boost' element={<BoostPage />} />
				<Route path='earn' element={<EarnPage />}>
					<Route path=':earnId' element={<EarnDetail />} />
				</Route>
				<Route path='leader' element={<LeaderPage />} />
				<Route path='squads' element={<SquadsPage />}>
					<Route path=':squadId' element={<SquadDetail />} />
				</Route>
				<Route path='/:invitcode' element={<Layout />} />
			</Route>
		</Routes>
	);
}
