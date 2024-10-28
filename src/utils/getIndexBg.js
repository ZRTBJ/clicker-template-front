export const getIndex = (pathname) => {
  if (/^\/squads\/.*$/.test(pathname)) return 1;
  if (/^\/earn\/.*$/.test(pathname)) return 3;

  switch (pathname) {
    case "/friends":
    case "/squads":
      return 1;
    case "/earn":
      return 3;
    case "/boost":
    case "/leader":
      return 2;

    default:
      return 1;
  }
};
