import classNames from 'classnames';

import s from './Button.module.scss';

export default function Button({ variant, className, ...props }) {
	return (
		<button
			className={classNames(s.button, className, {
				[s.blue]: variant === 'blue',
				[s.white]: variant === 'white',
			})}
			{...props}
		></button>
	);
}
