import { useEffect, useState } from 'react';
import CrossIcon from '../../../assets/icons/CrossIcon';
import GiftIcon from '../../../assets/icons/GiftIcon';
import TonIcon from '../../../assets/icons/TonIcon';
import { ton } from '../../../constants/tonObject';
import Button from '../../UI/Button/Button';
import Modal from '../Modal';

import s from './ConnectWalletModal.module.scss';

export default function ConnectWalletModal({ isOpen, onCLose }) {
	const [isConnected, setIsConnected] = useState(ton.connected);
	const [key, setKey] = useState(0);

    const refreshComponent = () => {
        setKey(prevKey => prevKey + 1);
    };
	
	useEffect(() => {
		// Следим за изменением ton.connected и обновляем локальное состояние
		setIsConnected(ton.connected);
	}, [ton.connected]);
	return (
		<Modal isOpen={isOpen} className={s.connectWalletModal}>
			<button className={s.close} onClick={onCLose}>
				<CrossIcon width='12' height='12' />
			</button>
			<div className={s.icon}>
				<GiftIcon width='36' height='36' />
			</div>
			<h4 className={s.title}>Connect TON wallet to take part in Airdrop</h4>
			<Button disabled={ton.connected} variant='blue' onClick={()=>{
				if (!ton.connected){
					ton.openModal()
				}
			}} className={s.button}>
				{(!ton.connected) ?
				<>
					<TonIcon /> Conect TON Wallet
				</>
				
				:
					'Airdrop soon...'
				}
			</Button>
		</Modal>
	);
}
