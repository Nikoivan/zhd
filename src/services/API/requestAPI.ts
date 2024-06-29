type RequestAPIProps = {
	url: string;
	options?: Record<string, unknown>;
};

export default async function requestAPI({ url, options }: RequestAPIProps) {
	const response = await fetch(url, options);

	if (!response || response.status >= 300) {
		throw new Error('Ошибка при ответе сервера, попробуйте снова');
	}

	return await response.json();
}
