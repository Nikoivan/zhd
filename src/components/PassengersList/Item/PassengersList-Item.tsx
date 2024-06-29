import { ChangeEvent, FC, useCallback, useEffect, useState } from 'react';
import { cn } from '@bem-react/classname';

import { TicketsSeat } from '../../../redux/slices/ticketSlice/ticketsSliceTypes';
import MinusCircle from '../../Icons/MinusCircle';
import PlusCircle from '../../Icons/PlusCircle';
import { Button } from '../../Button/Button';
import { ticketDataActions } from '../../../redux/slices/ticketSlice/ticketSlice';
import { useAppDispatch } from '../../../store/store';
import {
	Checkbox,
	FormControlLabel,
	IconButton,
	MenuItem,
	OutlinedInput,
	Select,
	SelectChangeEvent,
} from '@mui/material';
import { isKeyofSeatPersonInfo } from '../../../services/typeGuards/typeGuasrds';
import inputDateValidation from '../../../services/validators/inputDateValidation';
import { formatDateToInputValue } from '../../../services/utils/dateFormat.util';
import {
	getErrorText,
	isValidPersonInfoField,
	personInfoKeysForValidation,
} from '../../../services/validators/passInfoValidation';
import CloseError from '../../Icons/CloseError';
import Success from '../../Icons/Success';
import { createDocumentDataByInfo } from '../../../services/utils/creators.util';

const initErrors = {
	first_name: false,
	last_name: false,
	birthday: false,
	document_data: false,
};

const cnPassengersList = cn('PassengersList');

const PassengersListItem: FC<
	TicketsSeat & { personId: string; num: number; inFocus?: boolean; handleNextIndex: () => void }
> = ({ personId: id, person_info, inFocus, num, valid, handleNextIndex }) => {
	const [isOpen, setOpen] = useState<boolean>(inFocus || false);
	const [pasData, setPasData] = useState<{ serial: string; number: string }>(
		createDocumentDataByInfo(person_info.document_data, person_info.document_type)
	);
	const [errors, setErrors] = useState<typeof initErrors>(initErrors);
	const [errorText, setErrorText] = useState<{ text: string; example?: string } | null>(null);

	const dispatch = useAppDispatch();

	const handleValidate = useCallback(() => {
		const result = personInfoKeysForValidation.every((item) => {
			const valid = isValidPersonInfoField(person_info[item], item, person_info.document_type);

			if (!valid) {
				setErrors((prev) => ({ ...prev, [item]: true }));
				if (!errorText) {
					setErrorText(getErrorText(item, person_info.document_type));
				}
			}
			return valid;
		});

		if (valid !== result) {
			dispatch(ticketDataActions.setValidPlace({ id, value: result }));
		}
		if (result) {
			setErrors(initErrors);
			setErrorText(null);
		}
	}, [dispatch, errorText, id, person_info, valid]);

	const handleInputChange = useCallback(
		(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
			const { name: valueName, value } = e.target;

			let preparedValue = value.trim();

			if (!isKeyofSeatPersonInfo(valueName)) {
				return;
			}

			if (valueName === 'birthday') {
				if (inputDateValidation(preparedValue)) {
					preparedValue = formatDateToInputValue(value).value;
				} else {
					return;
				}
			}

			dispatch(ticketDataActions.changeSeatPersonInfo({ id, valueName, value: preparedValue }));
		},
		[dispatch, id]
	);

	const handleChageGender = useCallback(
		(type: 'man' | 'woman') => {
			if (type === 'man' && person_info.gender) {
				return;
			}
			if (type === 'woman' && !person_info.gender) {
				return;
			}

			dispatch(ticketDataActions.changeSeatPersonInfo({ id, valueName: 'gender', value: !person_info.gender }));
		},
		[dispatch, id, person_info.gender]
	);

	const handleChangePassData = useCallback(
		(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
			const { name, value } = e.target;

			if (name !== 'serial' && name !== 'number' && isKeyofSeatPersonInfo(name)) {
				const preparedValue =
					name === 'birthday'
						? formatDateToInputValue(value).value.length < 11
							? formatDateToInputValue(value, '.').value
							: formatDateToInputValue(value, '.').value.slice(0, 10)
						: value;

				dispatch(ticketDataActions.changeSeatPersonInfo({ id, valueName: name, value: preparedValue }));
			}

			if (
				(person_info.document_type === 'passport' &&
					((name === 'serial' && value.length === 5) || (name === 'number' && value.length >= 7))) ||
				(person_info.document_type === 'certificate' && value.length >= 13)
			) {
				return;
			}

			setPasData((prev) => ({ ...prev, [name]: value.trim() }));

			if (valid) {
				dispatch(ticketDataActions.setValidPlace({ id, value: false }));
			}
		},
		[dispatch, id, person_info.document_type, valid]
	);

	const handleRemove = useCallback(() => {
		dispatch(ticketDataActions.removePlaceById({ id }));
	}, [dispatch, id]);

	useEffect(() => {
		if (inFocus) {
			setOpen(true);
		}
	}, [inFocus]);

	useEffect(() => {
		dispatch(
			ticketDataActions.changeSeatPersonInfo({
				id,
				valueName: 'document_data',
				value: person_info.document_type === 'certificate' ? pasData.number : pasData.serial + pasData.number,
			})
		);
	}, [dispatch, pasData.number, pasData.serial]);

	useEffect(() => {
		if (
			!!person_info.first_name &&
			!!person_info.last_name &&
			!!person_info.birthday &&
			((person_info.document_type === 'certificate' && person_info.document_data.length === 12) ||
				(person_info.document_type === 'passport' && person_info.document_data.length === 10))
		) {
			handleValidate();
		}
	}, [
		handleValidate,
		person_info.birthday,
		person_info.document_data.length,
		person_info.document_type,
		person_info.first_name,
		person_info.last_name,
	]);

	return (
		<li className={cnPassengersList('Item')}>
			<div className={cnPassengersList('ItemHead')}>
				<IconButton onClick={() => setOpen(!isOpen)}>
					{isOpen ? <MinusCircle fontSize='large' /> : <PlusCircle fontSize='large' />}
				</IconButton>
				<span className={cnPassengersList('ItemTitle')}>Пассажир {num}</span>
				<Button
					className={cnPassengersList('RemoveBtn')}
					onClick={handleRemove}
					supraType='withoutAll'>
					&times;
				</Button>
			</div>
			{isOpen && (
				<>
					<div className={cnPassengersList('ItemMain')}>
						<div className={cnPassengersList('ItemTypeInfo')}>
							<Select
								className={cnPassengersList('AgeSelect')}
								value={person_info.is_adult ? 'is_adult' : 'is_child'}
								onChange={(e: SelectChangeEvent<'is_adult' | 'is_child'>) => {
									const { value } = e.target;

									dispatch(
										ticketDataActions.changeSeatPersonInfo({
											id,
											valueName: 'is_adult',
											value: value === 'is_adult' ? true : false,
										})
									);
									dispatch(
										ticketDataActions.changeSeatInfo({
											id,
											valueName: 'is_child',
											value: value === 'is_child' ? true : false,
										})
									);
									dispatch(
										ticketDataActions.changeSeatPersonInfo({
											id,
											valueName: 'document_type',
											value: value === 'is_adult' ? 'passport' : 'certificate',
										})
									);
								}}>
								<MenuItem value='is_adult'>Взрослый</MenuItem>
								<MenuItem value='is_child'>Детский</MenuItem>
							</Select>
						</div>
						<div className={cnPassengersList('PersonNames')}>
							<div className={cnPassengersList('PersonInfo')}>
								Фамилия
								<OutlinedInput
									className={cnPassengersList('PersonName')}
									name='last_name'
									value={person_info.last_name}
									onChange={handleChangePassData}
									onFocus={() => {
										if (errors.last_name) {
											setErrors((prev) => ({ ...prev, last_name: false }));
										}
									}}
									error={errors.last_name}
								/>
							</div>
							<div className={cnPassengersList('PersonInfo')}>
								Имя
								<OutlinedInput
									className={cnPassengersList('PersonName')}
									name='first_name'
									value={person_info.first_name}
									onChange={handleChangePassData}
									onFocus={() => {
										if (errors.first_name) {
											setErrors((prev) => ({ ...prev, first_name: false }));
										}
									}}
									error={errors.first_name}
								/>
							</div>
							<div className={cnPassengersList('PersonInfo')}>
								Отчество
								<OutlinedInput
									className={cnPassengersList('PersonName')}
									name='patronymic'
									value={person_info.patronymic}
									onChange={handleInputChange}
								/>
							</div>
						</div>
						<div className={cnPassengersList('GenderBirthdayInfo')}>
							<div className={cnPassengersList('PersonInfo')}>
								Пол
								<div className={cnPassengersList('GenderBirthdayWrap')}>
									<div className={cnPassengersList('GenderToggle', ['Bold'])}>
										<Button
											className={cnPassengersList('GenderBtn', { type: 'man', active: person_info.gender })}
											supraType='withoutAll'
											onClick={() => {
												handleChageGender('man');
											}}>
											М
										</Button>
										<Button
											className={cnPassengersList('GenderBtn', { type: 'woman', active: !person_info.gender })}
											supraType='withoutAll'
											onClick={() => {
												handleChageGender('woman');
											}}>
											Ж
										</Button>
									</div>
								</div>
							</div>
							<div className={cnPassengersList('PersonInfo')}>
								Дата рождения
								<OutlinedInput
									className={cnPassengersList('BirthdayInput')}
									value={person_info.birthday}
									placeholder='ДД/ММ/ГГ'
									name='birthday'
									onChange={handleChangePassData}
									onFocus={() => {
										if (errors.birthday) {
											setErrors((prev) => ({ ...prev, birthday: false }));
										}
									}}
									error={errors.birthday}
								/>
							</div>
						</div>
						<div className={cnPassengersList('InvalidInfo')}>
							<FormControlLabel
								className={cnPassengersList('InvalidCheckbox')}
								control={
									<Checkbox
										color='default'
										sx={{ '& .MuiSvgIcon-root': { fontSize: 38 } }}
									/>
								}
								label='ограниченная подвижность'
							/>
						</div>
					</div>
					<div className={cnPassengersList('DocumentInfo')}>
						<div className={cnPassengersList('PersonInfo')}>
							Тип документа
							<Select
								className={cnPassengersList('DocSelect', { type: person_info.document_type })}
								value={person_info.document_type}
								onChange={(e: SelectChangeEvent<'passport' | 'certificate'>) => {
									const { value } = e.target;

									dispatch(
										ticketDataActions.changeSeatPersonInfo({
											id,
											valueName: 'document_type',
											value,
										})
									);
								}}>
								<MenuItem value='passport'>Паспорт РФ</MenuItem>
								<MenuItem value='certificate'>Свидетельство о рождении</MenuItem>
							</Select>
						</div>
						{person_info.document_type === 'passport' && (
							<div className={cnPassengersList('PersonInfo')}>
								Серия
								<OutlinedInput
									className={cnPassengersList('DocData')}
									name='serial'
									value={pasData.serial}
									onChange={handleChangePassData}
									onFocus={() => {
										if (errors.document_data) {
											setErrors((prev) => ({ ...prev, document_data: false }));
										}
									}}
									placeholder='_ _ _ _'
									error={errors.document_data}
								/>
							</div>
						)}
						<div className={cnPassengersList('PersonInfo')}>
							Номер
							<OutlinedInput
								className={cnPassengersList('DocData')}
								name='number'
								value={pasData.number}
								onChange={handleChangePassData}
								onFocus={() => {
									if (errors.document_data) {
										setErrors((prev) => ({ ...prev, document_data: false }));
									}
								}}
								placeholder={person_info.document_type === 'passport' ? '_ _ _ _ _' : ' _ _ _ _ _ _ _ _ _ _ _ _ '}
								error={errors.document_data}
							/>
						</div>
					</div>
					<div
						className={cnPassengersList('ItemFooter', {
							with: errorText ? 'error' : undefined,
							valid,
						})}>
						{valid && (
							<div className={cnPassengersList('Success')}>
								<Success />
								<span className={cnPassengersList('SuccessText')}>Готово</span>
							</div>
						)}
						{!!errorText && (
							<div className={cnPassengersList('ErrorInfo')}>
								<IconButton
									className={cnPassengersList('ErrorBtn')}
									onClick={() => {
										setErrorText(null);
									}}>
									<CloseError />
								</IconButton>
								<div className={cnPassengersList('ErrorTextWrap')}>
									<span className={cnPassengersList('ErrorText')}>{errorText.text}</span>
									{!!errorText.example && (
										<span className={cnPassengersList('ExampleText')}>
											Пример: <b>{errorText.example}</b>
										</span>
									)}
								</div>
							</div>
						)}
						{!errorText && (
							<Button
								className={cnPassengersList('BtnNextItem')}
								onClick={() => {
									handleValidate();

									if (Object.values(errors).some((item) => item)) {
										handleNextIndex();
									}
								}}>
								Следующий пассажир
							</Button>
						)}
					</div>
				</>
			)}
		</li>
	);
};

export default PassengersListItem;
