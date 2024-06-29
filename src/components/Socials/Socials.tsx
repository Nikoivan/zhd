import { FC } from 'react';

import './Socials.scss';
import SocialsList, { SocialsItemProps } from './List/Socials-List';

export type SocialsProps = {
	title: string;
	data: SocialsItemProps[];
};

const Socials: FC<SocialsProps> = ({ title, data }) => (
	<div className='Socials'>
		<h4 className='Socials-Title'>{title}</h4>
		<SocialsList data={data} />
	</div>
);

export default Socials;
