import CrossIcon from '../../../assets/icons/CrossIcon';
import GiftIcon from '../../../assets/icons/GiftIcon';
import TonIcon from '../../../assets/icons/TonIcon';
import Button from '../../UI/Button/Button';
import Modal from '../Modal';

import s from './ConnectWalletModal.module.scss';

export default function ConnectWalletModal({ isOpen, onCLose }) {
	return (
		<Modal isOpen={isOpen} className={s.connectWalletModal}>
			<button className={s.close} onClick={onCLose}>
				<CrossIcon width='12' height='12' />
			</button>
			<div className={s.icon}>
				<GiftIcon width='36' height='36' />
			</div>
			<h4 className={s.title}>Connect TON wallet to take part in Airdrop</h4>
			<Button variant='blue' className={s.button}>
				<TonIcon /> Conect TON Wallet
			</Button>
		</Modal>
	);
}
