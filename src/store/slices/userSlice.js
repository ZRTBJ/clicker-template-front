import { createSlice } from '@reduxjs/toolkit';
import { q } from 'framer-motion/client';

const initialState = {
	id: 0,
	nickname: '',
	balance: 0,
	equipSkin: 0,
	multitap: 10,
	skins: [0],
	maxEnergy: 5000,
	energy: 5000,
	squad: null,
	completedTasks: [],
	photoUrl: '',
	tgId:'',
	multitaplevel: 0, maxenergylevel : 0, tapbotlevel:0 ,
	coinsClicked: 0,
	refills_made_for_day: 0
};


const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		setInitialUser: (state, action) => {
			state.energy = action.payload.energy;
			state.maxEnergy = action.payload.maxEnergy;
			state.multitap = action.payload.multitap;
			state.skins = action.payload.skins;
			state.balance = action.payload.balance;
			state.equipSkin = action.payload.equipSkin;
			state.nickname = action.payload.nickname;
			state.squad = action.payload.squad;
			state.id = action.payload.id
			state.photoUrl = action.payload.photoUrl
			state.tgId = action.payload.tgId
			state.coinsClicked = action.payload.coinsClicked
		},
		setRefillsMadeForDay: (state, action)=>{
			state.refills_made_for_day = action.payload
		},
		setBoostersLevels: (state,action) => {
			state.multitaplevel = action.payload.multitaplevel,
			state.maxenergylevel = action.payload.maxenergylevel,
			state.tapbotlevel = action.payload.tapbotlevel			
		},
		setCompletedTasks: (state, action) => {
			state.completedTasks = action.payload
		},
		setEnergy: (state, action) => {
			state.energy = action.payload;
		},
		setMaxEnergy: (state, action) => {
			state.maxEnergy = action.payload;
		},
		setMultitap: (state, action) => {
			state.multitap = action.payload;
		},
		setSkins: (state, action) => {
			state.skins.push(action.payload);
		},
		setEquipSkin: (state, action) => {
			state.equipSkin = action.payload;
		},
		setBalance: (state, action) => {
			state.balance = action.payload;
		},
		setSquad: (state, action) => {
			state.squad = action.payload;
		},
	},
});

export const {
	setCompletedTasks,
	setInitialUser,
	setEnergy,
	setMultitap,
	setSkins,
	setEquipSkin,
	setBalance,
	setMaxEnergy,
	setSquad,
	setBoostersLevels,
	setRefillsMadeForDay
} = userSlice.actions;
export default userSlice.reducer;
