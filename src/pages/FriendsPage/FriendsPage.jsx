import { useSelector } from 'react-redux';
import CopyIcon from '../../assets/icons/CopyIcon';
import SkinsIcon from '../../assets/icons/SkinsIcon';
import TelegramIcon from '../../assets/icons/TelegramIcon';
import PageTitle from '../../components/PageTitle/PageTitle';
import Button from '../../components/UI/Button/Button';
import { FRIENDSLIST } from '../../constants/friendList';

import s from './FriendsPage.module.scss';
import classNames from 'classnames';
import useCopy from '../../hooks/useCopy';

export default function FriendsPage() {
	const friends = useSelector((state) => state.users.friends);
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
	const { handleCopy, isCopied } = useCopy(links.path);
	return (
		<section className={s.friendsPage}>
			<PageTitle title='friends' subtitle='Invite friends and get' />
			<div className={s.friendsPage__middle}>
				<div className={s.reward}>
					<div className={s.reward__item}>
						<div className={s.reward__ceil}>
							<SkinsIcon isActive width={16} height={16} /> 10K
						</div>
						<span className={s.reward__text}>For one friend</span>
					</div>
					<div className={s.reward__item}>
						<div className={s.reward__ceil}>
							<SkinsIcon isActive width={16} height={16} /> 20K
						</div>
						<span className={s.reward__text}>For friend with TG Premium</span>
					</div>
					<div className={s.reward__item}>
						<span className={s.reward__ceil}>+10%</span>
						<span className={s.reward__text}>Of all their earnings</span>
					</div>
				</div>
				<div className={s.actions}>
				<a
						href={`https://telegram.me/share/url?url=${links.path}&text=${links.text}`}
						className={s.actions__invite}
					>
						<TelegramIcon />
						<span>invite a friend</span>
					</a>
					<Button className={s.actions__copy} onClick={handleCopy}>
						<span
							className={classNames({
								[s.clipboard]: true,
								[s.show]: isCopied,
							})}
						>
							Copied
						</span>
						<CopyIcon />
					</Button>
				</div>
			</div>
			<div className={s.friendsPage__bottom}>
				<h3 className={s.friendsPage__bottom__title}>Your friends (0)</h3>
				<div className={s.cards}>
					{friends.map((elem, index) => (
						<div className={s.card} key={index}>
							<div className={s.card__user}>
								<div className={s.card__avatar}>
									<img src={elem.avatar} alt='avatar' />
								</div>
								<span className={s.card__nickname}>{elem.nickname}</span>
							</div>
							<div className={s.card__reward}>
								+ <SkinsIcon isActive width={16} height={16} /> {elem.income}
							</div>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}
