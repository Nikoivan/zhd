import { FC, useRef, useState } from 'react';
import { cn } from '@bem-react/classname';

import useResize from '../../hooks/useResize';
import Pagination from '../Pagination/Pagination';
import * as data from '../../assets/feedbacks/feedbacks.json';

import './FeedBacks.scss';

const feedbacks = data.feedbacks;

const cnFeedBacks = cn('FeedBacks');

const FeedBacks: FC = () => {
	const [id, setId] = useState<number>(0);
	const sliderRef = useRef<HTMLDivElement>(null);
	const { width } = useResize(sliderRef);

	const onChange = (id: number) => {
		setId(id);
	};

	return (
		<div
			className={cnFeedBacks()}
			id='feedbacks'>
			<h3 className={cnFeedBacks('Title')}>Отзывы</h3>
			<div
				className={cnFeedBacks('Slider')}
				ref={sliderRef}>
				<div
					className={cnFeedBacks('SliderLine')}
					style={width ? { width: `${width * 5}px`, transform: `translatex(-${id * width}px)` } : undefined}>
					<ul className={cnFeedBacks('List')}>
						{feedbacks.map(({ name, content, image }, idx) => (
							<li
								className={cnFeedBacks('Item')}
								key={idx}>
								<img
									className={cnFeedBacks('ItemImage')}
									src={image}
								/>
								<div className={cnFeedBacks('ContentWrap')}>
									<span className={cnFeedBacks('AuthorName')}>{name}</span>
									<div className={cnFeedBacks('ItemContentWrap')}>
										<span className={cnFeedBacks('ItemContent', { type: 'quotes' })}>&#10077;</span>
										<p className={cnFeedBacks('ItemContent')}>
											{content}
											<span className={cnFeedBacks('ItemContent', { type: 'quotes' })}> &#10078;</span>
										</p>
									</div>
								</div>
							</li>
						))}
					</ul>
					<ul className={cnFeedBacks('List')}>
						{feedbacks.map(({ name, content, image }, idx) => (
							<li
								className={cnFeedBacks('Item')}
								key={idx}>
								<img
									className={cnFeedBacks('ItemImage')}
									src={image}
								/>
								<div className={cnFeedBacks('ContentWrap')}>
									<span className={cnFeedBacks('AuthorName')}>{name}</span>
									<div className={cnFeedBacks('ItemContentWrap')}>
										<span className={cnFeedBacks('ItemContent', { type: 'quotes' })}>&#10077;</span>
										<p className={cnFeedBacks('ItemContent')}>
											{content}
											<span className={cnFeedBacks('ItemContent', { type: 'quotes' })}> &#10078;</span>
										</p>
									</div>
								</div>
							</li>
						))}
					</ul>
					<ul className={cnFeedBacks('List')}>
						{feedbacks.map(({ name, content, image }, idx) => (
							<li
								className={cnFeedBacks('Item')}
								key={idx}>
								<img
									className={cnFeedBacks('ItemImage')}
									src={image}
								/>
								<div className={cnFeedBacks('ContentWrap')}>
									<span className={cnFeedBacks('AuthorName')}>{name}</span>
									<div className={cnFeedBacks('ItemContentWrap')}>
										<span className={cnFeedBacks('ItemContent', { type: 'quotes' })}>&#10077;</span>
										<p className={cnFeedBacks('ItemContent')}>
											{content}
											<span className={cnFeedBacks('ItemContent', { type: 'quotes' })}> &#10078;</span>
										</p>
									</div>
								</div>
							</li>
						))}
					</ul>
					<ul className={cnFeedBacks('List')}>
						{feedbacks.map(({ name, content, image }, idx) => (
							<li
								className={cnFeedBacks('Item')}
								key={idx}>
								<img
									className={cnFeedBacks('ItemImage')}
									src={image}
								/>
								<div className={cnFeedBacks('ContentWrap')}>
									<span className={cnFeedBacks('AuthorName')}>{name}</span>
									<div className={cnFeedBacks('ItemContentWrap')}>
										<span className={cnFeedBacks('ItemContent', { type: 'quotes' })}>&#10077;</span>
										<p className={cnFeedBacks('ItemContent')}>
											{content}
											<span className={cnFeedBacks('ItemContent', { type: 'quotes' })}> &#10078;</span>
										</p>
									</div>
								</div>
							</li>
						))}
					</ul>
					<ul className={cnFeedBacks('List')}>
						{feedbacks.map(({ name, content, image }, idx) => (
							<li
								className={cnFeedBacks('Item')}
								key={idx}>
								<img
									className={cnFeedBacks('ItemImage')}
									src={image}
								/>
								<div className={cnFeedBacks('ContentWrap')}>
									<span className={cnFeedBacks('AuthorName')}>{name}</span>
									<div className={cnFeedBacks('ItemContentWrap')}>
										<span className={cnFeedBacks('ItemContent', { type: 'quotes' })}>&#10077;</span>
										<p className={cnFeedBacks('ItemContent')}>
											{content}
											<span className={cnFeedBacks('ItemContent', { type: 'quotes' })}> &#10078;</span>
										</p>
									</div>
								</div>
							</li>
						))}
					</ul>
				</div>
			</div>
			<Pagination
				activeId={id}
				onChange={onChange}
			/>
		</div>
	);
};

export default FeedBacks;
