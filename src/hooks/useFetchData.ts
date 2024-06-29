import { useEffect, useRef, useState } from 'react';

export type ErrorStatus = {
	status: boolean;
	errorText?: string;
};

export enum RequestMethods {
	GET = 'GET',
	POST = 'POST',
	PUT = 'PUT',
	DELETE = 'DELETE',
}

export type OptionsMethods = 'GET' | 'POST' | 'PUT' | 'DELETE';

export type OptionsTypes = {
	method: RequestMethods;
	body?: string;
};

export type ReturnUseJsonType<T> = {
	data?: T;
	isLoading: boolean;
	error: string | null;
};

type UseFetchDataArgs = {
	url: string;
	options?: Record<string, string>;
	retryCount?: number;
};

export default function useFetchData<T>({ url, options, retryCount }: UseFetchDataArgs): ReturnUseJsonType<T> {
	const [data, setData] = useState<T>();
	const [isLoading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const timestampRef = useRef<number>();

	useEffect(() => {
		(async () => {
			const timestamp = Date.now();
			timestampRef.current = timestamp;
			setLoading(true);
			setError(null);
			try {
				const response = await fetch(url, options);
				if (!response.ok) {
					setError('Неизвестная ошибка при ответе сервера');
					throw new Error(response.statusText);
				}
				if (!/^20./.test(`${response.status}`)) {
					setError(response.statusText);
				}

				const json = await response.json();
				if (!json) {
					setError(response.statusText);
				}
				if (timestampRef.current === timestamp) {
					setData(json);
				}
			} catch (e) {
				console.log(e);
				setError('Ошибка сервера');
			} finally {
				setLoading(false);
			}
		})();
	}, [options, retryCount, url]);
	return { data, isLoading, error };
}
