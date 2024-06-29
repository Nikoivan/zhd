import { PersonInfo, SortValues, StringValuesNames, UserData } from '../../redux/slices/ticketSlice/ticketsSliceTypes';

export function isSortValues(value: unknown): value is SortValues {
	return typeof value === 'string' && (value === 'date' || value === 'price' || value === 'duration');
}

export function isStringValuesNames(value: unknown): value is StringValuesNames {
	return (
		typeof value === 'string' &&
		(value === 'from_city_id' ||
			value === 'to_city_id' ||
			value === 'date_start' ||
			value === 'date_end' ||
			value === 'date_start_arrival' ||
			value === 'date_end_arrival' ||
			value === 'end_arrival_hour_from' ||
			value === 'end_arrival_hour_to')
	);
}

export function isKeyofSeatPersonInfo(valueName: unknown): valueName is keyof PersonInfo {
	const personInfoKeys = [
		'is_adult',
		'first_name',
		'last_name',
		'patronymic',
		'gender',
		'birthday',
		'document_type',
		'document_data',
	];

	return typeof valueName === 'string' && personInfoKeys.includes(valueName);
}

export function isKeyofUserData(name: string): name is keyof Omit<UserData, 'payment_method'> {
	return name === 'first_name' || name === 'last_name' || name === 'patronymic' || name === 'phone' || name === 'email';
}
