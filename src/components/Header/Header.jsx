import { useDispatch, useSelector } from 'react-redux';
import GiftIcon from '../../assets/icons/GiftIcon';
import avatarImage from '../../assets/images/avatar.png';
import Button from '../UI/Button/Button';
import { setIsConnectWalletModal } from '../../store/slices/modalsSlice';

import s from './Header.module.scss';

export default function Header() {
	const dispatch = useDispatch();
	const { nickname } = useSelector(state => state.user);

	return (
		<header className={s.header}>
			<div className={s.header__user}>
				<div className={s.header__avatar}>
					<img src={avatarImage} alt='avatar' />
				</div>
				<span className={s.header__nickname}>{nickname}</span>
			</div>
			<Button
				className={s.header__button}
				onClick={() => dispatch(setIsConnectWalletModal(true))}
			>
				<GiftIcon />
				Airdrop
			</Button>
		</header>
	);
}
