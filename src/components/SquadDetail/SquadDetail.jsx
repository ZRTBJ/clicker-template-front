import { useNavigate, useParams } from 'react-router-dom';
import CloseButton from '../CloseButton/CloseButton';
import Modal from '../modals/Modal';
import s from './SquadDetail.module.scss';
import Button from '../UI/Button/Button';
import TelegramIcon from '../../assets/icons/TelegramIcon';
import CopyIcon from '../../assets/icons/CopyIcon';
import { useSelector } from 'react-redux';
import SkinsIcon from '../../assets/icons/SkinsIcon';
import { formatLinks } from '../../utils/formatText';

export default function SquadDetail() {
	const { squadId } = useParams();
	const navigate = useNavigate();
	const { squads } = useSelector(state => state.squads);
	const squad = squads.find(elem => elem.id === +squadId);

	return (
		<Modal isOpen className={s.squadDetail}>
			<CloseButton onClick={() => navigate(-1)} />
			<span className={s.subtitle}>Your squad</span>
			<h2 className={s.title}>@{formatLinks(squad?.title || '')}</h2>
			<div className={s.squadDetail__text}>
				<div className={s.squadDetail__place}>
					Place: <span>#{squads.findIndex(elem => squad === elem.id) + 1}</span>
				</div>
				<div className={s.squadDetail__moons}>
					Coins: <SkinsIcon width={12} height={12} />{' '}
					<span>{squad?.totalCoin}</span>
				</div>
			</div>
			<div className={s.actions}>
				<a href='#' className={s.actions__invite}>
					<TelegramIcon />
					<span>invite a friend</span>
				</a>
				<Button className={s.actions__copy}>
					<CopyIcon />
				</Button>
			</div>
		</Modal>
	);
}
