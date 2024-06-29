import { FC, ReactNode, useState } from 'react';
import Loading from '../Loading/Loading';

type UploaderProps = {
	component: ReactNode;
	url?: string;
	options?: Record<string, unknown>;
};

const Uploader: FC<UploaderProps> = ({ component }) => {
	const [isLoading] = useState<boolean>(false);

	return (
		<>
			{component}
			{isLoading && <Loading />}
			{/* {!error && <UploaderErrorHandler />} */}
		</>
	);
};

export default Uploader;
