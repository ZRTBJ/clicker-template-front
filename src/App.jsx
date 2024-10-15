import { useEffect } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { domAnimation, LazyMotion } from 'framer-motion';

import { store } from './store';
import Router from './Router';
import { setInitialUser } from './store/slices/userSlice';

import './globals.scss';

function App() {
	useEffect(() => {
		window.Telegram.WebApp.expand();
		store.dispatch(
			setInitialUser({
				energy: 5000,
				maxEnergy: 5000,
				multitap: 10,
				skins: [1],
				balance: 1000,
				equipSkin: 1,
				nickname: 'Alex',
			})
		);
	}, []);

	return (
		<LazyMotion features={domAnimation}>
			<Provider store={store}>
				<BrowserRouter>
					<Router />
				</BrowserRouter>
			</Provider>
		</LazyMotion>
	);
}

export default App;
