export function debounceDecorator(func: (arg1?: unknown, arg2?: unknown, arg3?: unknown) => void, delay: number) {
	let timeoutId: ReturnType<typeof setTimeout> | null = null;
	return function (arg1?: unknown, arg2?: unknown, arg3?: unknown) {
		if (timeoutId) {
			clearTimeout(timeoutId);
		}
		timeoutId = setTimeout(() => {
			timeoutId = null;
			func(arg1, arg2, arg3);
		}, delay);
	};
}
