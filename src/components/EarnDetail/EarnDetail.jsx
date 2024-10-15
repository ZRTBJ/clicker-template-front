import { useNavigate, useParams } from 'react-router-dom';
import CloseButton from '../CloseButton/CloseButton';
import Modal from '../modals/Modal';
import s from './EarnDetail.module.scss';
import SkinsIcon from '../../assets/icons/SkinsIcon';
import Button from '../UI/Button/Button';
import UpperRightArrow from '../../assets/icons/UpperRightArrow';
import { EXTRATASKS } from '../../constants/extraTasks';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { check_is_task_complete } from '../../api/check_is_task_complete';
import { setBalance, setCompletedTasks } from '../../store/slices/userSlice';

export default function EarnDetail() {
	const navigate = useNavigate();
	const { earnId } = useParams();
	var WebApp = window.Telegram.WebApp;
	const user = useSelector(state=>state.user)
	const tasks = useSelector(state=>state.tasks.tasks)
	const task = tasks.find(elem => elem.id === +earnId);
	const dispatch = useDispatch()
	useEffect(()=>{
		check_is_task_complete('', user.id, earnId).then(json=>{
			dispatch(setCompletedTasks(json.completed_tasks))	
			dispatch(setBalance(json.coins))		
		}) 
	}, [])
	return (
		<Modal isOpen className={s.earnDetail}>
			<CloseButton onClick={() => navigate(-1)} />
			<div className={s.image}>
				{earnId === '0' ? (
					<img src='/assets/telegram-icon.png' alt={task?.title} />
				) : (
					<img src={task?.image} alt={task?.title} />
				)}
			</div>
			<h3 className={s.title}>
				{earnId === '0' ? 'Invite friends' : task?.title}
			</h3>
			<div className={s.text}>
				+ <SkinsIcon /> {earnId === '0' ? '20,000' : task?.reward}
			</div>
			<Button variant='white' className={s.button} onClick={
				()=>{
					if (true){
						WebApp.openTelegramLink(task.channel_link)
					}
				}
			}>
				{(user.completedTasks.includes(task.id)) ? 'Already Done' : "Join channel"} <UpperRightArrow width={12} height={12} fill='#000' />
			</Button>
		</Modal>
	);
}
