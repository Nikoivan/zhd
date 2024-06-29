import { SeatsWidgetItemProps } from '../../components/SeatsWidget/SeatsWidget';
import { ClassTypes } from '../../components/TrainInfo/VanTypeList/TrainInfo-VanTypeList';
import { Seat } from '../../components/Van/Van';
import { getCorrectSeats } from '../mocks/van.mock';

const typesCount = {
	fourth: 2,
	third: 4,
	second: 4,
	first: 2,
};

export function getPlacesWrapArr(arr: Seat[], mod: number): Seat[][] {
	const newArr = [];
	let littleArr = [];
	for (let i = 0; i <= arr.length; i += 1) {
		if (i !== 0 && i % mod === 0) {
			newArr.push(littleArr);

			littleArr = [];
		}
		littleArr.push(arr[i]);
	}
	return newArr;
}

export function getPreparedPlaces(seats: Seat[], type: ClassTypes) {
	const newSeats: Seat[] = getCorrectSeats(seats, type);
	const firstArr: Seat[][] = getPlacesWrapArr(newSeats.slice(0, 32), typesCount[type]);

	if (type === 'fourth') {
		newSeats.splice(0, 32);
		newSeats.splice(0, 0, { index: 0, available: false });
		newSeats.splice(-1, 0, { index: 0, available: false });
	}

	if (type === 'third') {
		newSeats.splice(0, 32);
	}

	return {
		firstArr,
		secondArr: getPlacesWrapArr(newSeats, 2),
	};
}

export function getDataTypesWithoutError(data: SeatsWidgetItemProps[]): SeatsWidgetItemProps[] {
	const newData: SeatsWidgetItemProps[] = [];

	data.forEach((item) => {
		if (newData.find((el) => el.coach.class_type === item.coach.class_type)) {
			return;
		}
		newData.push(item);
	});

	return newData;
}
