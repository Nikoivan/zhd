export enum ValidationsTypes {
	EMAIL = 'email',
	DATE = 'date',
	SELECTED_DATE = 'selectedDate',
}

export type ValidationResult = {
	result: boolean;
	message: string | null;
};

const error = {
	[ValidationsTypes.EMAIL]: 'Неверный адресс электронной почты',
	[ValidationsTypes.DATE]: 'Указан неверный формат даты',
	default: 'Неверный тип валидации',
};

function emailValidation(value: string, type: ValidationsTypes.EMAIL): ValidationResult {
	const result = /^[a-z]+[-a-z0-9_]+@[a-z]+[-a-z0-9_]+\.[a-z]{2,}$/.test(value);
	return { result, message: result ? null : error[type] };
}

function dateValidation(value: string, type: ValidationsTypes.DATE): ValidationResult {
	const result = Number(value) >= 0;
	return { result, message: result ? null : error[type] };
}

export default function formValidation(value: string, type: string): ValidationResult {
	switch (type) {
		case ValidationsTypes.EMAIL:
			return emailValidation(value, type);

			break;

		case ValidationsTypes.DATE:
			return dateValidation(value, type);

			break;

		default:
			return { result: false, message: error.default };
	}
}
