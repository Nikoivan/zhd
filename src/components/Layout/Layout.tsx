import { FC } from 'react';
import { Outlet } from 'react-router';

import Footer from '../Footer/Footer';
import Header from '../Header/Header';

const Layout: FC = () => {
	return (
		<>
			<Header />
			<div className='Layout'>
				<Outlet />
			</div>
			<Footer />
		</>
	);
};

export default Layout;
