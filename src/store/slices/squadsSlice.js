import { createSlice } from '@reduxjs/toolkit';
import { SQUADS } from '../../constants/squads.constant';

const initialState = {
	squads: SQUADS,
};

const squadsSlice = createSlice({
	name: 'squads',
	initialState,
	reducers: {
		createSquads(state, action) {
			state.squads = [...state.squads, action.payload];
		},
		setSquads(state, action){
			state.squads = action.payload
		}
	},
});

export const { createSquads, setSquads } = squadsSlice.actions;

export default squadsSlice.reducer;
