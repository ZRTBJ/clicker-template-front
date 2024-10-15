import { useLocation } from 'react-router-dom';

import PlayIcon from '../assets/icons/PlayIcon';
import FriendsIcon from '../assets/icons/FriendsIcon';
import EarnIcon from '../assets/icons/EarnIcon';
import LeaderIcon from '../assets/icons/LeaderIcon';
import ShieldIcon from '../assets/icons/ShieldIcon';

export const useCustomNavigation = () => {
	const { pathname } = useLocation();

	const NAVIGATION = [
		{
			icon: <ShieldIcon isActive={pathname === '/squads'} />,
			name: 'Squads',
			path: '/squads',
		},
		{
			icon: <LeaderIcon isActive={pathname === '/leader'} />,
			name: 'Leader',
			path: '/leader',
		},
		{
			icon: <PlayIcon isActive={pathname === '/'} />,
			name: 'Play',
			path: '/',
		},
		{
			icon: <FriendsIcon isActive={pathname === '/friends'} />,
			name: 'Friends',
			path: '/friends',
		},
		{
			icon: <EarnIcon isActive={pathname === '/earn'} />,
			name: 'Earn',
			path: '/earn',
		},
	];

	return { NAVIGATION };
};
