import { FC, useCallback, useEffect, useMemo, useState } from 'react';
import { cn } from '@bem-react/classname';

import { IconButton } from '@mui/material';
import ArrowLeftBtn from '../../Icons/ArrowLeftBtn';
import ArrowRightBtn from '../../Icons/ArrowRigthBtn';
import { createPagination } from '../../../services/utils/creators.util';
import { Button } from '../../Button/Button';

const getState = ({
	limit,
	offset,
	totalCount,
}: {
	limit: number | null;
	offset: number | null;
	totalCount: number;
}): { start: number; end: number } => {
	const length = totalCount / (limit || 5);
	const initEnd = length > 2 ? 3 : 2;
	const initialState = { start: 0, end: initEnd };

	if (!offset) {
		return initialState;
	}

	const end = (offset + (limit || 5)) / (limit || 5);
	const start = end - initEnd;

	return end > initEnd ? { start, end } : initialState;
};

type TrainsWidgetFooterProps = {
	totalCount: number;
	urlLimit: number | null;
	urlOffset: number | null;
	onChange(valueName: string, value: string | number | boolean): void;
};

const cnTrainsWidget = cn('TrainsWidget');

const TrainsWidgetFooter: FC<TrainsWidgetFooterProps> = ({ totalCount, urlLimit, urlOffset, onChange }) => {
	const [activeIndex, setActiveIndex] = useState<number>(() => {
		return urlOffset ? urlOffset / (urlLimit || 5) : 0;
	});
	const [state, setState] = useState<{ start: number; end: number }>(
		getState({ totalCount, limit: urlLimit, offset: urlOffset })
	);

	const pagination = useMemo(() => createPagination(totalCount, urlLimit || 5), [totalCount, urlLimit]);

	const onClick = useCallback((index: number) => {
		setActiveIndex(index + state.start);
	}, []);

	const prevHandler = useCallback(() => {
		if (activeIndex === 0) {
			return;
		}

		if (activeIndex + 1 === state.start) {
			setState((prev) => ({ start: prev.start - 1, end: prev.end - 1 }));
		}

		setActiveIndex(activeIndex - 1);
	}, [activeIndex, state.start]);

	const nextHandler = useCallback(() => {
		if (activeIndex === pagination.length - 1) {
			return;
		}

		if (activeIndex + 1 === state.end) {
			setState((prev) => ({ start: prev.start + 1, end: prev.end + 1 }));
		}

		setActiveIndex(activeIndex + 1);
	}, [activeIndex, pagination, state]);

	useEffect(() => {
		const valueName = 'offset';

		const newOffset = activeIndex * (urlLimit || 5);

		if (newOffset !== urlOffset) {
			onChange(valueName, newOffset === 0 ? '' : newOffset);
		}
	}, [activeIndex, onChange, state, urlLimit, urlOffset]);

	return (
		<>
			{totalCount >= (urlLimit || 5) && (
				<div className={cnTrainsWidget('Footer')}>
					<ul className={cnTrainsWidget('PaginationList')}>
						<li className={cnTrainsWidget('PaginationItem')}>
							<IconButton
								className={cnTrainsWidget('PageBtn')}
								onClick={prevHandler}>
								<ArrowLeftBtn />
							</IconButton>
						</li>
						{pagination.slice(state.start, state.end).map((item, idx) => (
							<li
								key={idx}
								className={cnTrainsWidget('PaginationItem')}>
								<Button
									className={cnTrainsWidget(
										'PageBtn',
										{
											active: item - 1 === activeIndex,
											last: item === pagination.length,
										},
										['Bold']
									)}
									supraType='withoutAll'
									onClick={() => {
										onClick(idx);
									}}>
									{item}
								</Button>
							</li>
						))}
						<li className={cnTrainsWidget('PaginationItem')}>
							<IconButton
								className={cnTrainsWidget('PageBtn')}
								onClick={nextHandler}>
								<ArrowRightBtn />
							</IconButton>
						</li>
					</ul>
				</div>
			)}
		</>
	);
};

export default TrainsWidgetFooter;
