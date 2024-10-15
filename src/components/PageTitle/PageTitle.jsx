import s from './PageTitle.module.scss';

export default function PageTitle({ title, subtitle }) {
	return (
		<div className={s.pageTitle}>
			<h1 className={s.pageTitle__title}>{title}</h1>
			<span className={s.pageTitle__subtitle}>{subtitle}</span>
		</div>
	);
}
