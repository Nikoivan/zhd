import { FC } from 'react';
import { cn } from '@bem-react/classname';

import { Button } from '../Button/Button';

import './Pagination.scss';

type PaginationProps = {
	activeId: number;
	onChange(id: number): void;
};

const cnPagination = cn('Pagination');

const paginationItems = [0, 1, 2, 3, 4];

const Pagination: FC<PaginationProps> = ({ activeId, onChange }) => (
	<div className={cnPagination()}>
		{paginationItems.map((item, idx) => (
			<Button
				onClick={() => {
					onChange(item);
				}}
				supraType='withoutAll'
				key={idx}>
				<span className={cnPagination('Item', { type: activeId === item ? 'active' : undefined })}></span>
			</Button>
		))}
	</div>
);

export default Pagination;
