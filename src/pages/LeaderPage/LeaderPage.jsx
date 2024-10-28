import PageTitle from '../../components/PageTitle/PageTitle';
import { LEADER } from '../../constants/leader.constants';
import SkinsIcon from '../../assets/icons/SkinsIcon';

import s from './LeaderPage.module.scss';
import { useSelector } from 'react-redux';

export default function LeaderPage() {
	const usersLeaders = useSelector(state=>state.users.users)
	const user = useSelector(state=>state.user)

	function findUserIndexById(usersLeaders, targetId) {
		return usersLeaders.findIndex(user => user.id === targetId);
	}
	function formatNumber(num) {
		return num.toLocaleString('en-US'); // Используем 'en-US' для разделителей точкой
	  }

	return (
		<section className={s.leaderPage}>
			<PageTitle title={'leaderboard'} subtitle={findUserIndexById(usersLeaders, user.tgId)!=-1 ? `You are #${findUserIndexById(usersLeaders, user.tgId)+1}` : "You are not in board("}  />
			<div className={s.cards}>
				{usersLeaders.map((elem, index) => (
					<div className={s.card} key={index}>
						<p className={s.card__place}>#{index + 1}</p>
						<div className={s.card__info}>
							<img
								className={s.card__avatar}
								src={elem.avatar}
								alt={elem.nick}
							/>
							<p className={s.card__nick}>{elem.nick}</p>
						</div>
						<div className={s.card__coin}>
							{formatNumber(elem.coin)} <SkinsIcon width={14} height={14} />
						</div>
					</div>
				))}
			</div>
		</section>
	);
}
