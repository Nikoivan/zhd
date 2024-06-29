export function capitalizeFirstLetter(value: string) {
	return value.charAt(0).toUpperCase() + value.slice(1);
}

export function numberWithSpaces(value: number) {
	return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
}

export function getDocumentDataWithSpaces(type: 'passport' | 'certificate', value: string): string {
	if (type === 'passport') {
		return `${value.slice(0, 4)} ${value.slice(4)}`;
	}

	return `${value.slice(0, 4)} ${value.slice(4, 6)} ${value.slice(6)}`;
}
