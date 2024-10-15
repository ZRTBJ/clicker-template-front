import Modal from '../Modal';
import TickIcon from '../../../assets/icons/TickIcon';
import CrossIcon from '../../../assets/icons/CrossIcon';
import Button from '../../UI/Button/Button';

import s from './BuySkinModal.module.scss';

export default function BuySkinModal({ isOpen, isSuccess, onClose }) {
	return (
		<Modal isOpen={isOpen} className={s.buySkinModal}>
			<div className={s.icon}>{isSuccess ? <TickIcon /> : <CrossIcon />}</div>
			<div className={s.title}>
				{isSuccess ? 'Successful purchase' : 'Not enough coins'}
			</div>
			<Button variant='white' className={s.button} onClick={onClose}>
				Okay
			</Button>
		</Modal>
	);
}
