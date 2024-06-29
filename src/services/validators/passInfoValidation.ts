import { PersonInfo } from '../../redux/slices/ticketSlice/ticketsSliceTypes';

export const personInfoKeysForValidation: (keyof PersonInfo)[] = [
	'first_name',
	'last_name',
	'birthday',
	'document_data',
];

type DocDataErrors = {
	passport: string;
	certificate: string;
};

export const docDataErrors = {
	passport: { text: 'Номер паспорта указан некорректно', example: '4400-050111' },
	certificate: { text: 'Номер свидетельства о рождении указан некорректно', example: 'VIII-ЫП-123456' },
};

export const personInfoErrors = {
	first_name: { text: 'Ошибка в имени пассажира' },
	last_name: { text: 'Ошибка в имени пассажира' },
	birthday: { text: 'Ошибка в дате рождения пассажира' },
};

export function isNotEmptyField(value: string): boolean {
	return !!value && value.trim() !== '';
}

export function isValidStringField(value: string): boolean {
	return /[ а-яА-Я]+/.test(value);
}

export function isValidDate(value: string): boolean {
	if (value.length !== 10) {
		return false;
	}

	const date = +value.slice(0, 2);
	const month = +value.slice(3, 5);
	const year = +value.slice(6);

	return date > 0 && date < 32 && month > 0 && month < 13 && year > 1924 && year < 2025;
}

export function isPassportValid(value: string): boolean {
	return !!value && /[0-9]{10}/.test(value);
}

export function isCertificateValid(value: string): boolean {
	return !!value && /^[VI]{4}[А-Я]{2}[0-9]{6}$/.test(value);
}

export function isValidPersonInfoField(
	value: unknown,
	type: keyof PersonInfo,
	docType: 'passport' | 'certificate'
): boolean {
	if (typeof value !== 'string' || !personInfoKeysForValidation.includes(type)) {
		throw new Error('Валидация недопустимого значения');
	}

	if (!isNotEmptyField(value)) {
		return false;
	}

	if (type === 'birthday') {
		return isValidDate(value);
	}

	if (type === 'document_data') {
		if (docType === 'certificate') {
			return isCertificateValid(value);
		}
		return isPassportValid(value);
	}

	return isValidStringField(value);
}

export function getErrorText(personInfoKey: keyof PersonInfo, type: keyof DocDataErrors) {
	if (personInfoKey === 'document_data') {
		return docDataErrors[type];
	}
	if (personInfoKey !== 'first_name' && personInfoKey !== 'last_name' && personInfoKey !== 'birthday') {
		throw new Error('Значение ошибки отсутствует');
	}
	return personInfoErrors[personInfoKey];
}
