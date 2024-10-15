import { useCallback, useState } from 'react';

const useCopy = text => {
	const [isCopied, setIsCopied] = useState(false);

	const handleCopy = useCallback(() => {
		navigator.clipboard.writeText(text);
		setIsCopied(true);
		setTimeout(() => setIsCopied(false), 2000);
	}, [text]);

	return { isCopied, handleCopy };
};

export default useCopy;
