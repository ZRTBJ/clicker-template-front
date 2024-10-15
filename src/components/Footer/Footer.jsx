import { Link, useLocation } from 'react-router-dom';
import classNames from 'classnames';

import { useCustomNavigation } from '../../hooks/useCustomNavigation';

import s from './Footer.module.scss';

export default function Footer() {
	const { NAVIGATION } = useCustomNavigation();
	const { pathname } = useLocation();

	return (
		<footer className={s.footer}>
			{NAVIGATION.map((item, index) => (
				<Link
					key={index}
					to={item.path}
					className={classNames(s.footer__item, {
						[s.active]: pathname === item.path,
					})}
				>
					{item.icon}
					<span>{item.name}</span>
				</Link>
			))}
		</footer>
	);
}
