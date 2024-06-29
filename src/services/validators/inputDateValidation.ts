function getRegExp(length: number): string {
	const regExps = ['^[0-3]', '[0-9]', '[0-1]', '[0-9]', '2', '0', '2', '[4-5]$'];
	let regExp = '';

	for (let i = 0; i < length; i += 1) {
		regExp += regExps[i];
	}

	return regExp;
}

export default function inputDateValidation(value: string) {
	let formatValue = value.replace('/', '');
	if (formatValue.match('/')) {
		formatValue = formatValue.replace('/', '');
	}

	const regExp = new RegExp(getRegExp(formatValue.length));
	const result = regExp.test(formatValue);

	return result;
}
