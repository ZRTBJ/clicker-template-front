import { m, useAnimation } from 'framer-motion';
import { useSelector } from 'react-redux';

import { SKINIMG } from '../../constants/skins.constants';

import s from './GameCoin.module.scss';

export default function GameCoin({ handleClickCoin }) {
	const { energy, multitap, equipSkin } = useSelector(state => state.user);
	const controls = useAnimation();

	const handleClick = async e => {
		if (energy - multitap <= 0) return;
		handleClickCoin(e);

		await controls.start({
			rotate: [0, 0, 5, -5, 0],
			scale: [1, 0.9, 0.93, 0.95, 1],
			transition: { duration: 0.4, repeat: 0 },
		});
	};

	return (
		<m.div
			className={s.coinWrapper}
			animate={controls}
			onTouchEnd={handleClick}
		>
			<img src={SKINIMG[equipSkin - 1]} alt='silver' />
		</m.div>
	);
}
