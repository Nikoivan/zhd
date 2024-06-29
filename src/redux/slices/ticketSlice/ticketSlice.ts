import { createSlice } from '@reduxjs/toolkit';

import {
	AddPlacceAction,
	ChangeSeatInfoAction,
	ChangeSeatPersonInfoAction,
	PersonInfo,
	RemovePlaceByIdAction,
	SetActiveDirectionAction,
	SetUserPayMethodAction,
	SetUserValueAction,
	SetValidPlaceAction,
	TicketsData,
} from './ticketsSliceTypes';

const initialState: TicketsData = {
	activeDirection: null,
	lastDirectionsRequest: null,
	departure: null,
	user: {
		first_name: '',
		last_name: '',
		patronymic: '',
		phone: '',
		email: '',
		payment_method: null,
	},
};

export const ticketDataSlice = createSlice({
	name: 'ticketData',
	initialState,
	reducers: {
		setActiveDirection: (state, action: SetActiveDirectionAction) => {
			state.activeDirection = action.payload.direction;
		},
		setLastDirectionsRequestPath: (state, action) => {
			state.lastDirectionsRequest = action.payload.path;
		},
		addPlace: (state, action: AddPlacceAction) => {
			const { price, personId, directionId, personInfo, seatInfo } = action.payload;

			if (!state.activeDirection) {
				throw new Error('Отсуствует активное направление');
			}

			const seat = {
				...seatInfo,
				person_info: { ...personInfo },
				price,
				personId,
			};

			if (!state.departure) {
				state.departure = {
					route_direction_id: directionId,
					direction: Object.assign(state.activeDirection),
					seats: [seat],
				};
				return;
			}

			if (state.departure?.route_direction_id !== directionId) {
				throw new Error('Идентификаторы направлений не идентичны');
			}

			if (
				state.departure?.seats.length &&
				state.departure.route_direction_id === directionId &&
				state.departure.seats.find(
					(item) => item.coach_id === seatInfo.coach_id && item.seat_number === seatInfo.seat_number
				)
			) {
				state.departure.seats = state.departure.seats.filter(
					(item) => !(item.coach_id === seatInfo.coach_id && item.seat_number === seatInfo.seat_number)
				);

				return;
			}

			state.departure?.seats.push(seat);
		},
		changeSeatPersonInfo: (state, action: ChangeSeatPersonInfoAction) => {
			const { id, valueName, value } = action.payload;

			const seat = state.departure?.seats.find((item) => item.personId === id);

			if (!seat) {
				throw new Error('Отсутсвует информация о посадочном месте');
			}

			const type = typeof seat.person_info[valueName];

			if (type !== typeof value) {
				throw new Error('При изменение информации о посадочном месте, передаваемый тип данных не соответствует требуемому');
			}

			const newPersonInfo: PersonInfo = { ...seat.person_info, [valueName]: value };
			seat.person_info = newPersonInfo;
		},

		changeSeatInfo: (state, action: ChangeSeatInfoAction) => {
			const { id, valueName, value } = action.payload;

			let seat = state.departure?.seats.find((item) => item.personId === id);

			if (!seat) {
				throw new Error('Отсутсвует информация о посадочном месте');
			}

			const type = typeof seat[valueName];

			if (type !== typeof value) {
				throw new Error('При изменение информации о посадочном месте, передаваемый тип данных не соответствует требуемому');
			}

			const newSeat = Object.assign(seat);
			newSeat[valueName] = value;

			seat = newSeat;
		},
		removePlaceById: (state, action: RemovePlaceByIdAction) => {
			if (!state.departure?.seats) {
				throw new Error('Список пассажиров пуст');
			}

			state.departure.seats = state.departure.seats.filter((item) => item.personId !== action.payload.id);
		},
		setValidPlace: (state, action: SetValidPlaceAction) => {
			const { id, value } = action.payload;

			const seat = state.departure?.seats.find((item) => item.personId === id);

			if (!seat) {
				throw new Error('Отсутсвует информация о посадочном месте');
			}

			seat.valid = value;
		},
		setUserValue: (state, action: SetUserValueAction) => {
			const { name, value } = action.payload;

			state.user[name] = value;
		},

		setUserPayMethod: (state, action: SetUserPayMethodAction) => {
			const { value } = action.payload;

			state.user.payment_method = value === state.user.payment_method ? null : value;
		},
	},
});

export const ticketDataActions = ticketDataSlice.actions;
