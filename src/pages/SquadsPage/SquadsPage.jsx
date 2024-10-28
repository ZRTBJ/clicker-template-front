import { useDispatch, useSelector } from 'react-redux';
import ShieldIcon from '../../assets/icons/ShieldIcon';
import CreateOrJoinSquadModal from '../../components/modals/CreateOrJoinSquadModal/CreateOrJoinSquadModal';
import PageTitle from '../../components/PageTitle/PageTitle';
import Button from '../../components/UI/Button/Button';
import {
	setIsCreateOrJoinSquadModal,
	setIsExitSquadModal,
	setIsFinishSquadModal,
} from '../../store/slices/modalsSlice';
import FinishSquadModal from '../../components/modals/FinishSquadModal/FinishSquadModal';
import { setSquad } from '../../store/slices/userSlice';

import s from './SquadsPage.module.scss';
import { formatLinks } from '../../utils/formatText';
import { Link, Outlet } from 'react-router-dom';
import SkinsIcon from '../../assets/icons/SkinsIcon';
import { createSquad } from '../../api/createSquad';
import { setSquads } from '../../store/slices/squadsSlice';
import { getSquads } from '../../api/getSquads';
import ExitSquadModal from '../../components/ExitSquadModal';
import { useState } from 'react';

export default function SquadsPage() {
	
	const { squad, id} = useSelector((state) => state.user);
	const { squads } = useSelector((state) => state.squads);
	const { isCreateOrJoinSquadModal, isFinishSquadModal, isExitSquadModal } = useSelector(
		(state) => state.modals
	);
	const [squadToLeaveId, setSquadToLeaveId] = useState(1);
	const [squadToLeaveLink, setSquadToLeaveLink] = useState(1);
	const currentSquad = squad ? squads.find((elem) => elem.id === squad) : null;
	const dispatch = useDispatch();

	const handleConfirm = (title) => {
		
		createSquad('', id, squadToLeaveLink).then((json) => {
			if (json) {
				dispatch(setSquad(json.in_squad));
				dispatch(setIsExitSquadModal(false));
				dispatch(
				setIsFinishSquadModal({
				isOpen: true,
				isJoin: true,
				squadName: title,
			})
		);		
				
				
			}
		});
		handleClose(title);
	};

	const handleClose = (title) => {
		
		dispatch(setIsExitSquadModal(false));
		/* dispatch(
			setIsFinishSquadModal({
				isOpen: true,
				isJoin: true,
				squadName: title,
			})
		); */
	};
	function formatNumber(num) {
		return num.toLocaleString('en-US'); // Используем 'en-US' для разделителей точкой
	  }

	return (
		<section className={s.squadsPage}>
			<PageTitle
				title="Squad"
				subtitle="Create or join squads to farm moons together"
			/>
			<div className={s.squadsPage__middle}>
				{currentSquad ? (
					<div className={s.squadInfo}>
						<h4 className={s.squadInfo__title}>
							@{formatLinks(currentSquad.title)}
						</h4>
						<div className={s.squadInfo__text}>
							<div className={s.squadInfo__place}>
								Place:{' '}
								<span>
									#{squads.findIndex((elem) => squad === elem.id) + 1}
								</span>
							</div>
							<div className={s.squadInfo__coins}>
								Coins: <SkinsIcon width={12} height={12} />{' '}
								<span>{formatNumber(currentSquad.totalCoin)}</span>
							</div>
						</div>
						<Link to={`/squads/${currentSquad.id}`} className="link" />
					</div>
				) : (
					<div className={s.squadEmpty}>You are not in any of the squads</div>
				)}
				{squads.find((elem) => elem.founderId == id) ? null : 	<Button
					variant="white"
					className={s.createButton}
					onClick={() =>{ 
						
						dispatch(setIsCreateOrJoinSquadModal(true))
					}}
				>
					<ShieldIcon width={20} height={20} isActive /> Join/Create squad
				</Button>}
			</div>
			<div className={s.squadsPage__bottom}>
				<h3 className={s.title}>top squads</h3>
				<div className={s.list}>
					{squads.map((elem, index) => (
						<div key={elem.id} className={s.elem}>
							<div className={s.elem__place}>#{index + 1}</div>
							<div className={s.elem__center}>
								<div className={s.elem__image}>
									<img src={elem.image} alt="avatar" />
								</div>
								<div className={s.user}>
									<h4 className={s.user__nickname}>
										{formatLinks(elem.title)}
									</h4>
									<span className={s.user__totalCoin}>
										<SkinsIcon width={10} height={10} />
										{formatNumber(elem.totalCoin)}
									</span>
								</div>
							</div>
							{squad !== elem.id && (
								<Button
									variant="white"
									className={s.button}
									onClick={() => {
										if (currentSquad && id === currentSquad.founderId) {
											setSquadToLeaveId(elem.id)
											setSquadToLeaveLink(elem.link)
											dispatch(
												setIsExitSquadModal({
													isOpen: true,
													squadName: elem.link,
												})
											);
											
										
											return;
										}
										createSquad('', id, elem.link).then((json) => {
											if (json) {
												dispatch(
													setIsFinishSquadModal({
														isOpen: true,
														isJoin: true,
														squadName: elem.link,
													})
												);
												dispatch(setSquad(elem.id));
												getSquads('').then((json) => {
													dispatch(setSquads(json.result));
												});
											}
										});
									}}
								>
									Join
								</Button>
							)}
						</div>
					))}
				</div>
			</div>
			<CreateOrJoinSquadModal
				isOpen={isCreateOrJoinSquadModal}
				onClose={() => dispatch(setIsCreateOrJoinSquadModal(false))}
			/>
			<FinishSquadModal
				isOpen={isFinishSquadModal.isOpen}
				isJoin={isFinishSquadModal.isJoin}
				title={isFinishSquadModal.squadName}
				onClose={() => dispatch(setIsFinishSquadModal(false))}
			/>
			<ExitSquadModal
				isOpen={isExitSquadModal.isOpen}
				name={isExitSquadModal.squadName}
				handleConfirm={handleConfirm}
				onClose={handleClose}
			/>

			<Outlet />
		</section>
	);
}
