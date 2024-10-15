import ShieldIcon from '../../../assets/icons/ShieldIcon';
import { formatLinks } from '../../../utils/formatText';
import Button from '../../UI/Button/Button';
import Modal from '../Modal';

import s from './FinishSquadModal.module.scss';

export default function FinishSquadModal({ isOpen, isJoin, title, onClose }) {
	return (
		<Modal isOpen={isOpen} className={s.finishSquadModal}>
			<div className={s.icon}>
				<ShieldIcon isActive width={40} height={40} />
			</div>
			<h2 className={s.title}>
				{isJoin ? 'You have joined the squad' : 'You have created the squad'}
			</h2>
			<div className={s.text}>@{formatLinks(title)}</div>
			<Button variant='white' className={s.button} onClick={onClose}>
				Okay
			</Button>
		</Modal>
	);
}
