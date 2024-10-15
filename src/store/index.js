import { configureStore } from '@reduxjs/toolkit';

import modalsSlice from './slices/modalsSlice';
import userSlice from './slices/userSlice';
import squadsSlice from './slices/squadsSlice';
import usersSlice from './slices/usersSlice';
import tasksSlice from './slices/tasksSlice'
export const store = configureStore({
	reducer: {
		modals: modalsSlice,
		user: userSlice,
		squads: squadsSlice,
		users: usersSlice,
		tasks: tasksSlice
	},
});
