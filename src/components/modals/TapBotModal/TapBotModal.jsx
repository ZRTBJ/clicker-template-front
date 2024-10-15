import Modal from '../Modal';
import Button from '../../UI/Button/Button';

import s from './TapBotModal.module.scss';
import { useSelector } from 'react-redux';
import SkinsIcon from '../../../assets/icons/SkinsIcon';

export default function TapBotModal({ isOpen, onClose }) {
	const user = useSelector((state) => state.user);
	return (
		<Modal isOpen={isOpen} className={s.tapBotModal}>
			<h2 className={s.title}>You have earned</h2>
			<div className={s.reward}>
				+ <SkinsIcon isActive /> 1050
			</div>
			<Button variant="white" onClick={onClose}>
				Okay
			</Button>
		</Modal>
	);
}
