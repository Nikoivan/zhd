import { UserData } from '../../redux/slices/ticketSlice/ticketsSliceTypes';

export default function isValidFieldValue(name: Omit<keyof UserData, 'payment_method'>, value: string): boolean {
	if (name === 'first_name' || name === 'last_name' || name === 'patronymic') {
		return /^[А-Яа-я]+$/.test(value);
	}
	if (name === 'phone') {
		return /^\+?[\d-_ )(]+$/.test(value);
	}
	if (name === 'email') {
		return /^[a-zA-Z]\S+@\S+\.[a-z]{2}$/.test(value);
	}

	throw new Error('Недопустимый тип поля при валидации');
}
