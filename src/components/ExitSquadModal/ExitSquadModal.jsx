import React from 'react';

import s from './ExitSquadModal.module.scss';
import Modal from '../modals/Modal';
import Button from '../UI/Button/Button';
function ExitSquadModal({ handleConfirm, isOpen, onClose, name }) {
	return (
		<Modal isOpen={isOpen} className={s.exitSquadModal}>
			<h2 className={s.title}>You are the leaders of the squad</h2>
			<p className={s.text}> Do you want to remove you squad?</p>
			<div className={s.actions}>
				<Button
					variant="filled"
					onClick={() => {
						handleConfirm(name);
					}}
				>
					Yes
				</Button>
				<Button
					variant="white"
					onClick={() => {
						onClose(name);
					}}
				>
					No
				</Button>
			</div>
		</Modal>
	);
}

export default ExitSquadModal;
