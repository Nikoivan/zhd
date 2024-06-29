const errorMessage = 'Ошибка наименования пути';

const countsByPath = {
	'': 1,
	directions: 1,
	seats: 1,
	passengers: 2,
	payment: 3,
	confirm: 4,
};

export default function getActiveBarsCount(pathname: string): number {
	const path = pathname.slice(1).match(/^([a-z]+)/);

	if (!path) {
		throw new Error(errorMessage);
	}

	const value = path[1];

	if (
		value !== '' &&
		value !== 'passengers' &&
		value !== 'payment' &&
		value !== 'confirm' &&
		value !== 'directions' &&
		value !== 'seats'
	) {
		throw new Error(errorMessage);
	}

	return countsByPath[value];
}
