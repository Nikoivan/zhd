import { FC, useCallback, useState } from 'react';

import Contacts from '../Contacts/Contacts';
import Navigation from './Navigation/Navigation';

import './Footer.scss';

const Footer: FC = () => {
	const [hidden, setHidden] = useState<boolean>(false);
	const onHide = useCallback(() => {
		setHidden(!hidden);
	}, [hidden]);

	return (
		<footer
			className='Footer'
			id='contacts'>
			<Contacts className={hidden ? '_type_hidden' : null} />
			<Navigation
				hidden={hidden}
				onClick={onHide}
			/>
		</footer>
	);
};

export default Footer;
