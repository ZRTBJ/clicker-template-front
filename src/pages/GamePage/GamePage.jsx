import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import RefillIcon from '../../assets/icons/RefillIcon';
import SkinsIcon from '../../assets/icons/SkinsIcon';
import GameCoin from '../../components/GameCoin/GameCoin';
import RocketIcon from '../../assets/icons/RocketIcon';
import { setBalance, setEnergy } from '../../store/slices/userSlice';

import s from './GamePage.module.scss';
import { makeTaps } from '../../api/makeTap';

export default function GamePage() {
	const { energy, maxEnergy, multitap, balance, id, refills_made_for_day } = useSelector(
		(state) => state.user
	);
	const AdController = window.Adsgram.init({ blockId: '4139' });
	const dispatch = useDispatch();
	const tapCount = useRef(0);
	const isFull = energy >= 500;
	const isActiveRefill = energy >= 500;

	const showDamage = (coords) => {
		const damage = document.createElement('div');
		damage.classList.add(`damage`);
		damage.textContent = `+${multitap}`;
		damage.style.top = `${coords.coordY - 10}px`;
		damage.style.left = `${coords.coordX - 10}px`;
		document.body.append(damage);

		setTimeout(() => {
			damage.remove();
		}, 1000);
	};

	const handleClick = async (e) => {
		e.preventDefault();
		if (energy - multitap <= 0) return;

		window.Telegram.WebApp.HapticFeedback.impactOccurred('medium');
		const coords = {
			coordX: e.changedTouches[0].pageX,
			coordY: e.changedTouches[0].pageY,
		};
		showDamage(coords);

		dispatch(setEnergy(energy - multitap));
		dispatch(setBalance(balance + multitap));
		tapCount.current = tapCount.current + 1;
	};

	useEffect(() => {
		const intervalId = setInterval(() => {
			console.log(tapCount);
			if (tapCount.current > 0) {
				makeTaps('', id, tapCount.current).then((json) => {
					tapCount.current = 0;
				});
			}
		}, 3000);

		// Очистка интервала при размонтировании компонента
		return () => clearInterval(intervalId);
	}, [tapCount]); // Включаем зависимость, чтобы отправлять актуальные данные о количестве тапов

	useEffect(() => {
		const interval = setInterval(() => {
			if (energy !== maxEnergy) {
				if (energy > maxEnergy - 6) {
					dispatch(setEnergy(maxEnergy));
					return () => clearInterval(interval);
				}
				dispatch(setEnergy(energy + 6));
			}
		}, 4000);
		return () => clearInterval(interval);
	}, [energy, maxEnergy, dispatch]);

	useEffect(() => {
		const handleUnload = () => {
		  console.log('Выполнение логики перед выходом');
		  if (tapCount.current > 0) {
			makeTaps('', id, tapCount.current).then((json) => {
				tapCount.current = 0;
			});
		}
		};
	  
		window.addEventListener('unload', handleUnload);
	  
		return () => {
		  window.removeEventListener('unload', handleUnload);
		};
	  }, [tapCount]);

	return (
		<section className={s.gamePage} onTouchEnd={(e) => e.preventDefault()}>
			<div className={s.info}>
				<div className={s.info__header}>
					<p className={s.subtitle}>Coin balance</p>
					<div className={s.balance}>
						<SkinsIcon width={36} height={36} isActive />
						<p className={s.coin}>{balance}</p>
					</div>
				</div>
				<div
					className={s.info__energy}
					style={{ justifyContent: isFull ? 'center' : 'space-between' }}
				>
					<div className={s.energyWrapper}>
						<div className={s.energyText}>
							<p className={s.label}>Energy:</p>
							<p className={s.count}>
								{energy}/{maxEnergy}
							</p>
						</div>
						<div className={s.energyBar}>
							<div
								className={s.energyBarStrip}
								style={{ width: `${(energy * 100) / maxEnergy}%` }}
							/>
						</div>
					</div>
					{!isActiveRefill && refills_made_for_day < 20 ? (
						<button
							className={s.info__button}
							onClick={() => {

								AdController.show().then((result) => {
									dispatch(setEnergy(maxEnergy));
									refill_energy('', id).then((json) => {
										dispatch(setRefillsMadeForDay(json.refills_made_for_day));
									});
							
								}).catch((result) => {
									// user get error during playing ad or skip ad
									// do nothing or whatever you want
								})
									
									

							}}
							onTouchEnd={(e) => e.stopPropagation()}
						>
							<RefillIcon /> Refill
						</button>
					) : null}
				</div>
			</div>
			<GameCoin handleClickCoin={handleClick} />
			<Link
				to={'/boost'}
				className={s.boostLink}
				onTouchEnd={(e) => e.stopPropagation()}
			>
				<RocketIcon /> Boost
			</Link>
		</section>
	);
}
