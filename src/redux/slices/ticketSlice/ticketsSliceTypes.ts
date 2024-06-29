import { PayloadAction } from '@reduxjs/toolkit';

export type OptionsNames =
	| 'have_first_class'
	| 'have_second_class'
	| 'have_third_class'
	| 'have_fourth_class'
	| 'have_wifi'
	| 'have_air_conditioning'
	| 'have_express';

export type NumberValuesNames =
	| 'price_from'
	| 'price_to'
	| 'start_departure_hour_from'
	| 'start_departure_hour_to'
	| 'start_arrival_hour_from'
	| 'start_arrival_hour_to'
	| 'end_departure_hour_from'
	| 'end_departure_hour_to'
	| 'limit'
	| 'offset';

export type StringValuesNames =
	| 'from_city_id'
	| 'to_city_id'
	| 'date_start'
	| 'date_end'
	| 'date_start_arrival'
	| 'date_end_arrival'
	| 'end_arrival_hour_from'
	| 'end_arrival_hour_to';

export type SortValues = 'date' | 'price' | 'duration';

export type TicketsSeat = {
	price: number;
	coach_id: string;
	person_info: PersonInfo;
	seat_number: number;
	is_child: boolean;
	include_children_seat: boolean;
	valid?: boolean;
};

export type UserData = {
	first_name: string;
	last_name: string;
	patronymic: string;
	phone: string;
	email: string;
	payment_method: 'cash' | 'cashless' | null;
};

export type TicketsData = {
	activeDirection: DirectionListItem | null;
	lastDirectionsRequest: string | null;
	departure: {
		direction: DirectionListItem;
		route_direction_id: string;
		seats: (TicketsSeat & { personId: string })[];
	} | null;
	user: UserData;
};

export type CityInfo = {
	name: string;
	_id: string;
};

export type PriceItem = {
	top_price: number;
	bottom_price: number;
	side_price?: number;
};

export type PriceNames = 'first' | 'second' | 'third' | 'fourth';

export type SeatsInfo = {
	first: number;
	second: number;
	third: number;
	fourth: number;
};

export type TrainInfo = {
	name: string;
	_id: string;
};

type DirectionBaseType = {
	available_seats: number; //количество свободных мест
	available_seats_info: Partial<SeatsInfo>; //информация о посадочных местах
	have_first_class: boolean; //В поезде есть вагон класса «Люкс» (СВ)
	have_second_class: boolean; //В поезде есть вагон класса «Купе»
	have_third_class: boolean; //В поезде есть вагон класса «Плацкарт»
	have_fourth_class: boolean; //В поезде есть вагон с сидячими местами
	have_wifi: boolean; //wifi
	have_air_conditioning: boolean; //кондиционер
	have_express: boolean; //экспресс маршрут
	min_price: number; //Минимальная цена поездки (на 1 взрослого)
};

type PlacesInfo = {
	city: CityInfo; // информация о городе
	datetime: number; // Дата в секундах
	railway_station_name: string; // Информация о вокзале
};

export type ArrivalDepartureInfo = DirectionBaseType & {
	duration: number; //Длительность поездки (в секундах)
	from: PlacesInfo;
	to: PlacesInfo;
	price_info: Partial<Record<PriceNames, PriceItem>>;
	train: TrainInfo;
	_id: string;
	is_express: boolean;
};

export type DirectionListItem = DirectionBaseType & {
	departure: ArrivalDepartureInfo; //информация об отбытии
	arrival?: ArrivalDepartureInfo; //информация об прибытии
};

export type DirectionInfo = DirectionBaseType & {
	train: string; // Информация о поезде
	from: ArrivalDepartureInfo; // Информация об отправлении
	to: ArrivalDepartureInfo; // Информация о прибытии
	duration: number; // Длительность поездки (в секундах)
	price_info: string; // Информация о ценах в вагонах разного класса
	seats_info: string; // Информация о количестве свободных мест в каждом типе вагонов
};

export type DirectionsRequestResult = {
	total_count: number;
	items: DirectionListItem[];
};

export type PlaceTypes = 'departure' | 'arrival';

export type SeatInfo = {
	coach_id: string;
	seat_number: number;
	is_child: boolean;
	include_children_seat: boolean;
};

export type PersonInfo = {
	is_adult: boolean;
	first_name: string;
	last_name: string;
	patronymic: string;
	gender: boolean;
	birthday: string; //'1980-01-01'
	document_type: 'passport' | 'certificate';
	document_data: string; //'45 6790195'
};

export type SetActiveDirectionAction = PayloadAction<{ direction: DirectionListItem }>;
export type AddPlacceAction = PayloadAction<{
	price: number;
	personId: string;
	directionId: string;
	seatInfo: SeatInfo;
	personInfo: PersonInfo;
}>;
export type ChangeSeatPersonInfoAction = PayloadAction<{
	id: string;
	valueName: keyof PersonInfo;
	value: string | boolean | number;
}>;
export type ChangeSeatInfoAction = PayloadAction<{
	id: string;
	valueName: keyof SeatInfo;
	value: string | boolean | number;
}>;
export type RemovePlaceByIdAction = PayloadAction<{ id: string }>;
export type SetValidPlaceAction = PayloadAction<{ id: string; value: boolean }>;
export type SetUserValueAction = PayloadAction<{ name: keyof Omit<UserData, 'payment_method'>; value: string }>;
export type SetUserPayMethodAction = PayloadAction<{ value: 'cash' | 'cashless' | null }>;
