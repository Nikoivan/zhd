import { FC, useMemo, useState } from 'react';
import { cn } from '@bem-react/classname';
import { Tooltip } from '@mui/material';

import { numberWithSpaces } from '../../../services/utils/strings.util';
import Coffee from '../../Icons/Available/Coffee';
import Linens from '../../Icons/Available/Linens';
import WiFiAvailable from '../../Icons/Available/Wifi';
import Conditioner from '../../Icons/Available/Conditioner';
import Rub from '../../Icons/Rub';
import { Button } from '../../Button/Button';
import { SeatsWidgetItemProps } from '../../SeatsWidget/SeatsWidget';
import Van from '../../Van/Van';
import { OnPlaceClickData } from '../TrainInfo';

export type Coach = {
	available_seats: number;
	class_type: 'fourth' | 'third' | 'second' | 'first';
	have_air_conditioning: boolean;
	have_wifi: boolean;
	is_linens_included: boolean;
	linens_price: number;
	wifi_price: number;
	name: string;
	price: number;
	side_price: number;
	bottom_price: number;
	top_price: number;
	train: string; //id поезда
	_id: string; //id вагона видимо
};

//массив заглушка поскольку сервер не присылает номера вагонов
const vanNumbersMock = ['03', '07', '09', '17', '21'];

const cnTrainInfo = cn('TrainInfo');

const TrainInfoVansInfo: FC<{
	data: SeatsWidgetItemProps[];
	directionId: string;
	onPlaceClick: (data: OnPlaceClickData) => void;
}> = ({ data, directionId, onPlaceClick }) => {
	const [index, setIndex] = useState<number>(0);
	const vanNumbers = useMemo(() => vanNumbersMock.slice(0, data.length), [data.length]);

	const {
		coach: { available_seats, top_price, bottom_price, have_air_conditioning, have_wifi, is_linens_included, _id },
	} = data[index];

	return (
		<>
			<div className={cnTrainInfo('VansInfo')}>
				<div className={cnTrainInfo('VansWrap')}>
					<div className={cnTrainInfo('VansSubWrap')}>
						<span className={cnTrainInfo('VansItemTitle')}>Вагоны</span>
						<ul className={cnTrainInfo('VansNumberList', ['List'])}>
							{/* заглушка поскольку сервер не присылает номера вагонов */}
							{vanNumbers.map((item, idx) => (
								<li
									className={cnTrainInfo('VansNumberItem', { selected: item === vanNumbersMock[index] })}
									key={idx}>
									<Button
										supraType='withoutAll'
										onClick={() => {
											setIndex(idx);
										}}>
										{item}
									</Button>
								</li>
							))}
						</ul>
					</div>
					<span className={cnTrainInfo('VansAnnotation')}>Нумерация вагонов начинается с головы поезда</span>
				</div>
				<ul className={cnTrainInfo('VanPropsList', ['List'])}>
					<li className={cnTrainInfo('VanPropsItem', { type: 'count' })}>
						<span className={cnTrainInfo('VanNumber')}>{vanNumbersMock[index]}</span>
						<span className={cnTrainInfo('VanNumberAnnotation')}>вагон</span>
					</li>
					<li className={cnTrainInfo('VanPropsItem')}>
						<div className={cnTrainInfo('Row')}>
							<span className={cnTrainInfo('PropItemTitle')}>Места {available_seats}</span>
						</div>
						{!!top_price && (
							<div className={cnTrainInfo('Row')}>
								<span className={cnTrainInfo('PropItemType')}>Верхние </span>
								<span className={cnTrainInfo('PlacesAnnotation', ['Bold'])}>{3}</span>
							</div>
						)}
						{!!bottom_price && (
							<div className={cnTrainInfo('Row')}>
								<span className={cnTrainInfo('PropItemType')}>Нижние </span>
								<span className={cnTrainInfo('PlacesAnnotation', ['Bold'])}>{8}</span>
							</div>
						)}
					</li>
					<li className={cnTrainInfo('VanPropsItem')}>
						<div className={cnTrainInfo('Row')}>
							<span className={cnTrainInfo('PropItemTitle')}>Стоимость</span>
						</div>
						{!!top_price && (
							<div className={cnTrainInfo('Row')}>
								<span className={cnTrainInfo('PropItemType')}>{numberWithSpaces(top_price)}</span>
								<span className={cnTrainInfo('PlacesAnnotation')}>
									<Rub fontSize='small' />
								</span>
							</div>
						)}
						{!!bottom_price && (
							<div className={cnTrainInfo('Row')}>
								<span className={cnTrainInfo('PropItemType')}>{numberWithSpaces(bottom_price)}</span>
								<span className={cnTrainInfo('PlacesAnnotation')}>
									<Rub fontSize='small' />
								</span>
							</div>
						)}
					</li>
					<li className={cnTrainInfo('VanPropsItem', { type: 'services' })}>
						<div className={cnTrainInfo('Row')}>
							<span className={cnTrainInfo('PropItemTitle')}>Обслуживание</span>
							<span className={cnTrainInfo('PropOther')}>ФПК</span>
						</div>
						<ul className={cnTrainInfo('IconsList', ['List'])}>
							{have_air_conditioning && (
								<li className={cnTrainInfo('IconItem')}>
									<Tooltip
										title='кондиционер'
										slotProps={{
											tooltip: {
												sx: {
													fontSize: '18px',
													color: '#000',
													backgroundColor: '#e5e5e5',
												},
											},
											popper: {
												modifiers: [
													{
														name: 'offset',
														options: {
															offset: [0, -14],
														},
													},
												],
											},
										}}>
										<span>
											<Conditioner
												available={false}
												fontSize='large'
											/>
										</span>
									</Tooltip>
								</li>
							)}
							{have_wifi && (
								<li className={cnTrainInfo('IconItem')}>
									<Tooltip
										title='беспроводная сеть'
										slotProps={{
											tooltip: {
												sx: {
													fontSize: '18px',
													color: '#000',
													backgroundColor: '#e5e5e5',
												},
											},
											popper: {
												modifiers: [
													{
														name: 'offset',
														options: {
															offset: [0, -14],
														},
													},
												],
											},
										}}>
										<span>
											<WiFiAvailable
												available={false}
												fontSize='large'
											/>
										</span>
									</Tooltip>
								</li>
							)}
							{is_linens_included && (
								<li className={cnTrainInfo('IconItem')}>
									<Tooltip
										title='постельное белье'
										slotProps={{
											tooltip: {
												sx: {
													fontSize: '18px',
													color: '#000',
													backgroundColor: '#e5e5e5',
												},
											},
											popper: {
												modifiers: [
													{
														name: 'offset',
														options: {
															offset: [0, -14],
														},
													},
												],
											},
										}}>
										<span>
											<Linens
												available={true}
												fontSize='large'
											/>
										</span>
									</Tooltip>
								</li>
							)}
							<li className={cnTrainInfo('IconItem')}>
								<Tooltip
									title='чай, кофе'
									slotProps={{
										tooltip: {
											sx: {
												fontSize: '18px',
												color: '#000',
												backgroundColor: '#e5e5e5',
											},
										},
										popper: {
											modifiers: [
												{
													name: 'offset',
													options: {
														offset: [0, -14],
													},
												},
											],
										},
									}}>
									<span>
										<Coffee
											available={true}
											fontSize='large'
										/>
									</span>
								</Tooltip>
							</li>
						</ul>
						<div className={cnTrainInfo('SelectionInfo')}>{available_seats} человек выбирают места в этом поезде</div>
					</li>
				</ul>
			</div>
			<Van
				directionId={directionId}
				type={data[index].coach.class_type}
				coachId={_id}
				seats={data[index].seats}
				onPlaceClick={onPlaceClick}
			/>
		</>
	);
};

export default TrainInfoVansInfo;
