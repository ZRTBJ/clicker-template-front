import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	tasks: [],
};

const tasksSlice = createSlice({
	name: 'tasks',
	initialState,
	reducers: {
		createTask(state, action) {
			state.tasks = [...state.squads, action.payload];
		},
		setTasks(state, action){
			state.tasks = action.payload
		}
	},
});

export const { createTask, setTasks } = tasksSlice.actions;

export default tasksSlice.reducer;
