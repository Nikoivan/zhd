import { createBrowserRouter } from 'react-router-dom';

import Layout from '../components/Layout/Layout';
import Index from '../Pages/Index';
import ChoiceDirections from '../Pages/ChoiceDirections';
import Passengers from '../Pages/Passengers';
import Payment from '../Pages/Payment';
import ConfirmOrder from '../Pages/ConfirmOrder';
import ChoiceSeats from '../Pages/ChoiceSeats';
import Success from '../Pages/Succeess';

const router = createBrowserRouter([
	{
		path: '/zhd',
		element: <Layout />,
		children: [
			{ index: true, element: <Index /> },
			{ path: 'directions', element: <ChoiceDirections /> },
			{ path: 'seats/:id', element: <ChoiceSeats /> },
			{ path: 'passengers', element: <Passengers /> },
			{ path: 'payment', element: <Payment /> },
			{ path: 'confirm', element: <ConfirmOrder /> },
			{ path: 'success', element: <Success /> },
		],
	},
]);

export default router;
