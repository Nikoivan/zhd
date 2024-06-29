const errorMessage = 'Ошибка наименования пути';

const countsByPath = {
	zhd: 1,
	directions: 1,
	seats: 1,
	passengers: 2,
	payment: 3,
	confirm: 4,
};

export default function getActiveBarsCount(pathname: string): number {
	let value = 1;

	if (!pathname.includes('zhd')) {
		throw new Error(errorMessage);
	}

	if (pathname.includes('directions') || pathname.includes('seats')) {
		return value;
	}

	if (pathname.includes('passengers')) {
		value = 2;
	}

	if (pathname.includes('payment')) {
		value = 3;
	}

	if (pathname.includes('confirm')) {
		value = 4;
	}

	return value;
}
