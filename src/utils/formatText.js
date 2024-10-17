export const formatLinks = link => {
	if (link.includes('t.me/')) {
		return link.substring(5, link.length);
	}

	return link;
};

export const formatCoinLeader = (coin) => {
	if (coin >= 1e6) {
		return (coin / 1e6).toFixed(1).replace(/\.0$/, '') + 'M';
	} else if (coin >= 1e3) {
		return (coin / 1e3).toFixed(1).replace(/\.0$/, '') + 'K';
	} else {
		return coin.toString();
	}
};
