import { ChangeEvent, FC, useCallback, useState } from 'react';
import { IconButton, Popover } from '@mui/material';
import { cn } from '@bem-react/classname';

import changeIconUrl from '../../../assets/icons/change.svg';
import locationIconUrl from '../../../assets/icons/location.svg';
import { useAppDispatch, useAppSelector } from '../../../store/store';
import { Input } from '../../Input/Input';
import {
	FieldNames,
	PlaceListItemProps,
	formPlacesActions,
} from '../../../redux/slices/formPlacesSlice/formPlacesSlice';
import FormPlacesList from '../PlacesList/Form-PlacesList';

type FormPlacesProps = {
	fromCityId: string | null;
	toCityId: string | null;
	onChange: (valueName: string, value: string | number | boolean) => void;
};

const cnForm = cn('Form');

const FormPlaces: FC<FormPlacesProps> = ({ fromCityId, toCityId, onChange: onChangeInvoke }) => {
	const [anchorEl, setAnchorEl] = useState<HTMLInputElement | null>(null);
	const { activeSearchField, searchValues, placesList, errors } = useAppSelector((store) => store.formPlaces);

	const dispatch = useAppDispatch();

	const onChange = (event: ChangeEvent<HTMLInputElement>) => {
		const { name, value } = event.target;

		if (name !== 'selectedPlaceTo' && name !== 'selectedPlaceFrom') {
			return;
		}
		setAnchorEl(event.target);

		const payload: {
			fieldName: FieldNames;
			value: string;
		} = {
			fieldName: name,
			value,
		};

		dispatch(formPlacesActions.changeSearchValue(payload));
	};

	const onSelect = (option: PlaceListItemProps) => {
		if (!activeSearchField) {
			return;
		}

		dispatch(formPlacesActions.onSelect({ listItem: option }));

		onChangeInvoke(activeSearchField === 'selectedPlaceFrom' ? 'from_city_id' : 'to_city_id', option._id);
	};

	const onClose = () => {
		dispatch(formPlacesActions.onClose());
	};

	const onSwap = useCallback(() => {
		const { selectedPlaceFrom, selectedPlaceTo } = searchValues;

		if (!selectedPlaceFrom || !selectedPlaceTo || !fromCityId || !toCityId) {
			return;
		}

		const cloneToCityId = toCityId;

		dispatch(formPlacesActions.swapPlaces());
		onChangeInvoke('to_city_id', fromCityId);
		onChangeInvoke('from_city_id', cloneToCityId);
	}, [dispatch, fromCityId, onChangeInvoke, searchValues, toCityId]);

	return (
		<>
			<Input
				className={cnForm('Input', { type: errors.selectedPlaceFrom ? 'error' : undefined })}
				onChange={onChange}
				placeholder='Откуда'
				name='selectedPlaceFrom'
				value={searchValues.selectedPlaceFrom}
				endAdornment={
					<IconButton>
						<img src={locationIconUrl} />
					</IconButton>
				}
			/>

			<IconButton
				className='Form-Button Form-Button_type_swap'
				onClick={onSwap}>
				<img
					src={changeIconUrl}
					alt='change-button'
				/>
			</IconButton>

			<Input
				className={cnForm('Input', { type: errors.selectedPlaceTo ? 'error' : undefined })}
				onChange={onChange}
				placeholder='Куда'
				name='selectedPlaceTo'
				value={searchValues.selectedPlaceTo}
				endAdornment={
					<IconButton>
						<img src={locationIconUrl} />
					</IconButton>
				}
			/>

			<Popover
				open={!!placesList?.length}
				anchorEl={anchorEl}
				anchorOrigin={{
					vertical: 55,
					horizontal: -15,
				}}
				onClose={onClose}>
				<FormPlacesList
					onSelect={onSelect}
					options={placesList}
				/>
			</Popover>
		</>
	);
};

export default FormPlaces;
