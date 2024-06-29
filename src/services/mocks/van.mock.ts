import { ClassTypes } from '../../components/TrainInfo/VanTypeList/TrainInfo-VanTypeList';
import { Seat } from '../../components/Van/Van';

export function getCorrectSeats(seats: Seat[], type: ClassTypes) {
	const newSeats = [...seats];
	const countByType = {
		first: 16,
		second: 32,
		third: 48,
		fourth: 62,
	};

	for (let i = seats.length + 1; i <= countByType[type]; i += 1) {
		newSeats.push({ index: i, available: false });
	}
	return newSeats;
}
