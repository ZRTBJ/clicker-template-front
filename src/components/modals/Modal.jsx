import classNames from 'classnames';
import { m, AnimatePresence } from 'framer-motion';

export default function Modal({ isOpen, children, className, isKeyboard }) {
	return (
		<AnimatePresence>
			{isOpen && (
				<m.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
					className={classNames('modal', {
						keyboard: isKeyboard,
					})}
				>
					<m.div
						initial={{ transform: 'translateY(100%)' }}
						animate={{ transform: 'translateY(0px)' }}
						exit={{ transform: 'translateY(100%)' }}
						className={className}
					>
						{children}
					</m.div>
				</m.div>
			)}
		</AnimatePresence>
	);
}
