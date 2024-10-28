import { Link, Outlet } from 'react-router-dom';
import SkinsIcon from '../../assets/icons/SkinsIcon';
import UpperRightArrow from '../../assets/icons/UpperRightArrow';
import PageTitle from '../../components/PageTitle/PageTitle';
import { EXTRATASKS } from '../../constants/extraTasks';
import s from './EarnPage.module.scss';
import { useSelector } from 'react-redux';

export default function EarnPage() {
	const tasks = useSelector(state=>state.tasks.tasks)
	const user = useSelector((state) => state.user);
	const links = {
		path: `https://t.me/AKZYTestClickerBot?start=${user.tgId}`,
		text: 	`
Hi! This bot was created by the @akzy_studio team .
Attention! The bot is used for demonstration purposes only. 
Our channel - @akzy_studio
Contact manager - @AkzyStudioManager 


Привет! Этот бот был создан командой @akzy_studio .
Внимание! Бот используется исключительно в демонстрационных целях. 
Наш канал - @akzy_studio
Контакты менеджера - @AkzyStudioManager 
		
		`,
	};
	return (
		<section className={s.earnPage}>
			<PageTitle title='earn' subtitle='Complete tasks and get coins' />
			<div className={s.invite}>
				<h3 className={s.title}>Permanent task</h3>
				<div className={s.invite__content}>
					<div className={s.invite__image}>
						<img src='/assets/telegram-icon.png' alt='telegram' />
					</div>
					<div className={s.invite__text}>
						<span>Invite friends</span>
						<span>
							up to <SkinsIcon width='10' height='10' fill='#fff' /> 20,000
						</span>
						<span>and 10% of all their earnings</span>
					</div>
					<a href='#' className={s.invite__link}>
						<UpperRightArrow />
					</a>
					<Link to={`https://telegram.me/share/url?url=${links.path}&text=${links.text}`} className="link" />
				</div>
			</div>
			<div className={s.extra}>
				<h3 className={s.title}>Extra rewards</h3>
				<div className={s.cards}>
					{tasks.map((elem, index) => (
						<div className={s.extra__content} key={index}>
							<div className={s.extra__image}>
								<img src={elem.image} alt={elem.title} />
							</div>
							<div className={s.extra__text}>
								<span>{elem.title}</span>
								<span>
									+ <SkinsIcon isActive width='10' height='10' /> {elem.reward}
								</span>
							</div>
							<a href='#' className={s.extra__link}>
								<UpperRightArrow />
							</a>
							<Link to={`/earn/${elem.id}`} className='link' />
						</div>
					))}
				</div>
			</div>
			<Outlet />
		</section>
	);
}
