import { FC } from 'react';
import { cn } from '@bem-react/classname';

import url from '../../assets/icons/loading.svg';

import './Loading.scss';

const cnLoading = cn('Loading');

const Loading: FC = () => (
	<div className={cnLoading()}>
		<span className={cnLoading('Title')}>идет поиск</span>
		<img
			src={url}
			alt='loading'
			className={cnLoading('Icon')}
		/>
	</div>
);

export default Loading;
