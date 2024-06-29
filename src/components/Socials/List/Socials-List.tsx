import { FC } from 'react';

import './Socials-List.scss';

export type SocialsItemProps = {
	title: string;
	value: string;
	icon: string;
};

const SocialsList: FC<{ data: SocialsItemProps[] }> = ({ data }) => (
	<ul className='Socials-List'>
		{data.map((item, idx) => (
			<a
				className='Socials-Item'
				key={idx}
				href={item.value}>
				<img
					className='Socials-Image'
					src={item.icon}
					alt={item.title}
				/>
			</a>
		))}
	</ul>
);

export default SocialsList;
