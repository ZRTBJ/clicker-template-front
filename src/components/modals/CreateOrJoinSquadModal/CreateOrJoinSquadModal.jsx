import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Modal from '../Modal';
import CloseButton from '../../CloseButton/CloseButton';
import ShieldIcon from '../../../assets/icons/ShieldIcon';
import Button from '../../UI/Button/Button';
import Loader from '../../Loader/Loader';
import { setSquad } from '../../../store/slices/userSlice';
import { createSquads } from '../../../store/slices/squadsSlice';

import s from './CreateOrJoinSquadModal.module.scss';
import { setIsFinishSquadModal } from '../../../store/slices/modalsSlice';
import { createSquad } from '../../../api/createSquad';

export default function CreateOrJoinSquadModal({ isOpen, onClose }) {
	const [isError, setIsError] = useState(false);
	const [text, setText] = useState('');
	const [isLoading, setIsLoading] = useState(false);
	const [activeKeyboard, setActiveKeyboard] = useState(false);
	const [scrollPosition, setScrollPosition] = useState(0);
	const { energy, maxEnergy, multitap, balance, id } = useSelector(
		(state) => state.user
	);
	const { squads } = useSelector((state) => state.squads);
	const dispatch = useDispatch();

	const handleJoin = (squad) => {
		setIsLoading(true);
		setTimeout(() => {
			setIsLoading(false);
			dispatch(setSquad(squad.id));
			onClose();
			dispatch(
				setIsFinishSquadModal({
					isOpen: true,
					isJoin: true,
					squadName: text,
				})
			);
			setIsLoading(false);
		}, 1000);
	};

	const handleCreate = () => {
		setIsLoading(true);
		setTimeout(() => {
			const id = Date.now();
			dispatch(setSquad(id));
			dispatch(
				createSquads({
					id: id,
					title: text.replace('https://t.me/', ''),
					totalCoin: 0,
					image: '/assets/avatar.png',
				})
			);
			dispatch(
				setIsFinishSquadModal({
					isOpen: true,
					isJoin: false,
					squadName: text.replace('https://t.me/', ''),
				})
			);
			onClose();
			setIsLoading(false);
		}, 1000);
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		createSquad('', id, text.trim())
			.then((json) => {
				if (json) {
					if (json.is_created) {
						handleCreate();
					} else {
						handleJoin();
					}
				}
			})
			.catch(() => {
				return setIsError(true);
			});
		/* setIsError(false);
		if (text.trim() === '' || !/^https:\/\/t\.me\/([a-zA-Z0-9_]+)$/.test(text)) {
			return setIsError(true);
		}
		const squad = squads.find(squad => squad.title === text);
		console.log(squad);
		if (squad) {
			handleJoin(squad);
		} else {
			handleCreate();
		}
		setText(''); */
	};

	const handleFocus = () => {
		setScrollPosition(window.scrollY);

		document.body.style.position = 'fixed';
		document.body.style.top = `-${window.scrollY}px`;
		document.body.style.width = '100%';

		setActiveKeyboard(true);
	};

	const handleBlur = () => {
		document.body.style.position = '';
		document.body.style.top = '';
		document.body.style.width = '';
		window.scrollTo(0, scrollPosition);
		//@ts-ignore
		setActiveKeyboard(false);
	};

	return (
		<Modal
			isOpen={isOpen}
			className={s.createOrJoinSquadModal}
			isKeyboard={activeKeyboard}
		>
			<CloseButton onClick={onClose} />
			<div className={s.content}>
				<div className={s.icon}>
					<ShieldIcon isActive width={40} height={40} />
				</div>
				<h3 className={s.title}>Create a squad or join</h3>
				<p className={s.description}>
					Enter a link of a public channel and click the button below to
					join/create your own squad
				</p>
			</div>
			<form className={s.actions} onSubmit={handleSubmit}>
				<label className={s.label}>
					<input
						onFocus={handleFocus}
						onBlur={handleBlur}
						type="text"
						className={s.input}
						placeholder="Example: https://t.me/name_bot"
						onChange={(e) => setText(e.target.value)}
					/>
				</label>
				{isError && (
					<span className={s.errorText}>
						The group or channel address is incorrect or typed incorrectly
					</span>
				)}
				<Button
					type="submit"
					variant="white"
					className={s.button}
					disabled={isLoading}
				>
					{isLoading ? <Loader width="24px" /> : 'Join/Create'}
				</Button>
			</form>
		</Modal>
	);
}
