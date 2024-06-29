import { PriceItem } from '../../redux/slices/ticketSlice/ticketsSliceTypes';

type GetPriceByInfoType = {
	priceItem: PriceItem;
	isChild: boolean;
	isLuxury: boolean;
	index: number;
};

export default function getPriceByInfo({ priceItem, isChild, isLuxury, index }: GetPriceByInfoType) {
	let priceType: keyof PriceItem = 'bottom_price';

	if (index > 32 && priceItem.side_price) {
		priceType = 'side_price';
	} else if (index % 2 === 0 && !isLuxury) {
		priceType = 'top_price';
	}

	const price = priceItem[priceType];

	if (!price) {
		throw new Error('Отсутствует цена на заданные места');
	}
	return isChild ? price * 0.6 : price;
}
