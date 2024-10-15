import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	isTapBotModal: false,
	isBuySkinModal: {
		isOpen: false,
		isSuccess: false,
	},
	isConnectWalletModal: false,
	isCreateOrJoinSquadModal: false,
	isFinishSquadModal: {
		isOpen: false,
		isJoin: false,
		squadName: '',
	},
	isExitSquadModal: {
		isOpen: false,
		squadName: '',
	},
};

const modalSlice = createSlice({
	name: 'modal',
	initialState,
	reducers: {
		setIsTapBotModal(state, action) {
			state.isTapBotModal = action.payload;
		},
		setIsBuySkinModal(state, action) {
			if (action.payload.isOpen) {
				state.isBuySkinModal = {
					isOpen: true,
					isSuccess: action.payload.isSuccess,
				};
			} else {
				state.isBuySkinModal = {
					isOpen: false,
					isSuccess: false,
				};
			}
		},
		setIsConnectWalletModal(state, action) {
			if (action.payload) {
				state.isConnectWalletModal = action.payload;
			} else {
				state.isConnectWalletModal = false;
			}
		},
		setIsCreateOrJoinSquadModal(state, action) {
			if (action.payload) {
				state.isCreateOrJoinSquadModal = action.payload;
			} else {
				state.isCreateOrJoinSquadModal = false;
			}
		},
		setIsFinishSquadModal(state, action) {
			if (action.payload.isOpen) {
				state.isFinishSquadModal = {
					isJoin: action.payload.isJoin,
					isOpen: true,
					squadName: action.payload.squadName,
				};
			} else {
				state.isFinishSquadModal = {
					isJoin: false,
					isOpen: false,
					squadName: '',
				};
			}
		},
		setIsExitSquadModal(state, action) {
			if (action.payload.isOpen) {
				state.isExitSquadModal = {
					isOpen: true,
					squadName: action.payload.squadName,
				};
			} else {
				state.isExitSquadModal = {
					isOpen: false,
					squadName: '',
				};
			}
		},
	},
});

export const {
	setIsTapBotModal,
	setIsBuySkinModal,
	setIsConnectWalletModal,
	setIsCreateOrJoinSquadModal,
	setIsFinishSquadModal,
	setIsExitSquadModal,
} = modalSlice.actions;

export default modalSlice.reducer;
