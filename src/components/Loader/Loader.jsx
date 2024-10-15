import s from './Loader.module.scss';

export default function Loader({ width = '70px' }) {
	return (
		<div className={s.loadingWrapper}>
			<div className={s.loader} style={{ width: width }} />
		</div>
	);
}
