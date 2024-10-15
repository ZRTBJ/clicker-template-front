import QrIcons from '../../assets/icons/QrIcons';
import s from './Qr.module.scss';

export default function Qr() {
	return (
		<section className={s.qr}>
			<QrIcons />
			<div className={s.text}>
				<h1 className={s.title}>Play on your mobile</h1>
				<p className={s.subtitle}>@telegram_name</p>
			</div>
		</section>
	);
}
