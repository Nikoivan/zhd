type RequestOptions = {
	from_city_id?: string | null;
	to_city_id?: string | null;
	date_start?: string | null;
	date_end?: string | null;
	date_start_arrival?: string | null;
	date_end_arrival?: string | null;
	end_arrival_hour_from?: string | null;
	end_arrival_hour_to?: string | null;
	price_from?: number | null;
	price_to?: number | null;
	start_departure_hour_from?: number | null;
	start_departure_hour_to?: number | null;
	start_arrival_hour_from?: number | null;
	start_arrival_hour_to?: number | null;
	end_departure_hour_from?: number | null;
	end_departure_hour_to?: number | null;
	limit?: number | null;
	offset?: number | null;
	have_first_class?: boolean;
	have_second_class?: boolean;
	have_third_class?: boolean;
	have_fourth_class?: boolean;
	have_wifi?: boolean;
	have_air_conditioning?: boolean;
	have_express?: boolean;
};

function getBaseUrl(): string {
	return 'https://students.netoservices.ru/fe-diplom';
}

export function getBaseUrlWithRoutes(): string {
	return getBaseUrl() + '/routes';
}

export function getCitiesRequesUrl(name: string): string {
	return `${getBaseUrlWithRoutes()}/cities?name=${name}`;
}

export function getLastDirectionsUrl(): string {
	return `${getBaseUrlWithRoutes()}/last`;
}

export function getUrlSubscription(query: string): string {
	return `${getBaseUrl()}/subscribe?email=${query}`;
}

export function getUrlToSendOrder(): string {
	return `${getBaseUrl()}/order`;
}

export function getParamsByOptions(options: RequestOptions): Record<string, string> {
	const optionsEntries = Object.entries(options).filter(([, value]) => !!value);

	return optionsEntries.reduce((acc, [key, value]) => ({ ...acc, [key]: String(value) }), {});
}
