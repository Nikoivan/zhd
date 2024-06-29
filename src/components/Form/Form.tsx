import { FC, FormEvent, useCallback } from 'react';
import { createSearchParams, useNavigate, useSearchParams } from 'react-router-dom';
import { Button } from '@mui/material';
import { cn } from '@bem-react/classname';

import { useAppDispatch, useAppSelector } from '../../store/store';
import { formPlacesActions } from '../../redux/slices/formPlacesSlice/formPlacesSlice';
import { getParamsByOptions } from '../../services/utils/url.util';
import { PropsWithMainPageArg } from '../Header/Widget/Header-Widget';
import FormPlaces from './Places/Form-Places';
import FormDates from './Dates/Form-Dates';

import './Form.scss';

const cnForm = cn('Form');

const Form: FC<PropsWithMainPageArg> = ({ isMainPage }) => {
	const [searchParams, setSearchParams] = useSearchParams();
	const { selectedPlaceFrom, selectedPlaceTo } = useAppSelector((state) => state.formPlaces);
	const dispatch = useAppDispatch();
	const navigate = useNavigate();

	const onClickHandler = useCallback(() => {
		if (!selectedPlaceFrom) {
			dispatch(formPlacesActions.setError({ fieldName: 'selectedPlaceFrom', isError: true }));

			return;
		}

		if (!selectedPlaceTo) {
			dispatch(formPlacesActions.setError({ fieldName: 'selectedPlaceTo', isError: true }));

			return;
		}

		const newParams = getParamsByOptions({
			from_city_id: searchParams.get('from_city_id'),
			to_city_id: searchParams.get('to_city_id'),
			date_start: searchParams.get('date_start'),
			date_end: searchParams.get('date_end'),
		});

		navigate({ pathname: 'directions', search: '?' + createSearchParams(newParams) });
	}, [dispatch, navigate, searchParams, selectedPlaceFrom, selectedPlaceTo]);

	const onChange = useCallback((valueName: string, value: string | number | boolean) => {
		if (String(value) === '') {
			searchParams.delete(valueName);
		} else {
			searchParams.set(valueName, String(value));
		}
		setSearchParams(searchParams);
	}, []);

	return (
		<form
			className={cnForm({ type: isMainPage ? 'main' : undefined })}
			onSubmit={(e: FormEvent) => {
				e.preventDefault();
			}}>
			<div className={cnForm('Wrapper_type_entity')}>
				<span className={cnForm('Annotation', { type: isMainPage ? 'main' : undefined })}>Направление</span>
				<div className={cnForm('Wrapper', { type: isMainPage ? 'main' : undefined })}>
					<FormPlaces
						onChange={onChange}
						fromCityId={searchParams.get('from_city_id')}
						toCityId={searchParams.get('to_city_id')}
					/>
				</div>
			</div>
			<div className={cnForm('Wrapper_type_entity')}>
				<span className={cnForm('Annotation', { type: isMainPage ? 'main' : undefined })}>Дата</span>
				<div className={cnForm('Wrapper', { type: isMainPage ? 'main' : undefined })}>
					<FormDates
						onChange={onChange}
						dateStart={searchParams.get('date_start')}
						dateEnd={searchParams.get('date_end')}
					/>
				</div>
				<div className={cnForm('Wrapper_type_end', { type: isMainPage ? 'end' : undefined })}>
					<Button
						className={cnForm('Button', [cnForm('Button_type_action', { type: isMainPage ? 'main' : undefined })])}
						onClick={onClickHandler}>
						Найти билеты
					</Button>
				</div>
			</div>
		</form>
	);
};

export default Form;
