import { useDispatch, useSelector } from 'react-redux';

import StarsIcon from '../../assets/icons/StarsIcon';
import PageTitle from '../../components/PageTitle/PageTitle';
import SkinsPage from '../SkinsPage';
import Button from '../../components/UI/Button/Button';
import { BOOST } from '../../constants/boost.constant';
import {
	setBalance,
	setBoostersLevels,
	setMaxEnergy,
	setMultitap,
} from '../../store/slices/userSlice';
import { setIsBuySkinModal } from '../../store/slices/modalsSlice';

import s from './BoostPage.module.scss';
import classNames from 'classnames';
export default function BoostPage() {
	const dispatch = useDispatch();
	
	const {
		id,
		balance,
		multitap,
		maxEnergy,
		multitaplevel,
		maxenergylevel,
		tapbotlevel,
	} = useSelector((state) => state.user);

	console.log([multitaplevel,
		maxenergylevel,
		tapbotlevel,])
	const handleBuy = (elem) => {
		var price =  elem.titleForApi == 'multitap'
				? elem.price* ( multitaplevel + 1)
				: elem.titleForApi == 'maxenergy'
				? elem.price* (maxenergylevel + 1)
				: elem.titleForApi == 'tapbot' && tapbotlevel == 0 && 1;

		if (balance >= price) {
			buyBooster('', id, elem.titleForApi).then((json) => {
				if (json) {
				
						dispatch(setBalance(json.coins));
						dispatch(setMaxEnergy(json.max_energy));
						dispatch(
							setBoostersLevels({
								multitaplevel: json.boosters.multitap.times_was_bought,
								maxenergylevel: json.boosters.maxenergy.times_was_bought,
								tapbotlevel: json.boosters.tapbot.times_was_bought,
							})
						);
						dispatch(setMultitap(json.coins_per_click));
						dispatch(setIsBuySkinModal({ isOpen: true, isSuccess: true }));
						return;
				
					
				}
				else{
					dispatch(setIsBuySkinModal({ isOpen: true, isSuccess: false }));
				}
			});
		} else {
			dispatch(setIsBuySkinModal({ isOpen: true, isSuccess: false }));
			return;
		}
	};

	return (
		<div className={s.wrapper}>
			<section className={s.boostPage}>
				<PageTitle
					title={'boost'}
					subtitle={'Buy boost to increase your income'}
				/>
				<div className={s.cards}>
					{BOOST.map((elem, index) => (
						<div key={index} className={s.card}>
							<div className={s.card__left}>
								<div className={s.card__iconWrapper}>{elem.icon}</div>
								<div className={s.card__text}>
									<p className={s.title}>{elem.title}</p>
									<div className={s.description}>
										{elem.bonus ? (
											<>
												<span>+</span> {elem.bonus}
											</>
										) : null}{' '}
										{elem.description}
									</div>
								</div>
							</div>
							<Button
							className={s.card__button}
							variant={'white'}
							onClick={
								elem.titleForApi == 'tapbot' && tapbotlevel != 0
									? () => {}
									: () => handleBuy(elem)
							}
							disabled={elem.titleForApi === 'tapbot' && tapbotlevel != 0}
						>
								<StarsIcon width={16} height={16} /> 
							{elem.titleForApi == 'multitap'
								? elem.price * ( multitaplevel + 1)
								: elem.titleForApi == 'maxenergy'
								? elem.price * (maxenergylevel + 1 )
								: elem.titleForApi == 'tapbot' && tapbotlevel == 0
								? elem.price
								: 'ALREADY WORKS'}
						</Button>
						</div>
					))}
				</div>
			</section>
			<SkinsPage />
		</div>
	);
}
