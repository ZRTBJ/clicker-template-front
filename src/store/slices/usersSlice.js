import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	users: [],
	friends:[]
};

const usersSlice = createSlice({
	name: 'users',
	initialState,
	reducers: {
		setFriends(state, action){
			state.friends = action.payload
		},
		setUsers(state, action){
			state.users = action.payload
		}
	},
});

export const { setFriends, setUsers } = usersSlice.actions;

export default usersSlice.reducer;
