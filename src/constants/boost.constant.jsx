import MultitapIcon from '../assets/icons/MultitapIcon';
import EnergyIcon from '../assets/icons/EnergyIcon';
import TapBotIcon from '../assets/icons/TapBotIcon';
import SkinsIcon from '../assets/icons/SkinsIcon';
import LightningIcon from '../assets/icons/LightningIcon';
export const BOOST = [
	{
		id: 1,
		title: 'Multitap',
		titleForApi:'multitap',
		description: '1 coins per tap',
		price: 5000,
		icon: <MultitapIcon />,
		bonus: <SkinsIcon width={10} height={10} />,
	},
	{
		id: 2,
		title: 'Max energy',
		titleForApi:'maxenergy',
		description: '500 max energy',
		price: 5000,
		icon: <EnergyIcon />,
		bonus: <LightningIcon />,
	},
	{
		id: 3,
		title: 'Tap Bot',
		titleForApi:'tapbot',
		description: 'Get autoclicker for 12h',
		price: 100000,
		icon: <TapBotIcon />,
		bonus: null,
	},
];
