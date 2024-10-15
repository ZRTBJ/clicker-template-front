export const formatLinks = link => {
	if (link.includes('t.me/')) {
		return link.substring(5, link.length);
	}

	return link;
};
