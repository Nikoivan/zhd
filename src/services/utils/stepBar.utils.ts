const errorMessage = 'Ошибка наименования пути';

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
