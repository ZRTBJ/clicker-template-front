import CrossIcon from '../../assets/icons/CrossIcon';

import s from './CloseButton.module.scss';

export default function CloseButton(props) {
	return (
		<button className={s.closeButton} {...props}>
			<CrossIcon width={10} height={10} />
		</button>
	);
}
