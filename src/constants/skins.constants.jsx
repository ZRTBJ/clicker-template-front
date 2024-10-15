import PizzaCoin from '../assets/images/pizzaCoin.webp';
import SilverCoin from '../assets/images/silverCoin.webp';
import GoldCoin from '../assets/images/goldCoin.webp';

export const SKINIMG = [SilverCoin, GoldCoin, PizzaCoin];

export const SKINS = [
	{
		id: 1,
		img: SilverCoin,
		title: 'Blue moon',
		titleForApi: 'bluemoon',
		bonus: '30 per tap',
		price: 99,
	},
	{
		id: 2,
		img: GoldCoin,
		title: 'Gold moon',
		titleForApi: 'goldmoon',
		bonus: '70 per tap',
		price: 249,
	},
	{
		id: 3,
		img: PizzaCoin,
		title: 'Pink moon',
		titleForApi: 'pinkmoon',
		bonus: '150 per tap',
		price: 499,
	},
];
