import { RefObject, useCallback, useEffect, useState } from 'react';

const useResize = (ref: RefObject<HTMLElement>) => {
	const [width, setWidth] = useState(0);
	const [height, setHeight] = useState(0);

	const handleResize = useCallback(() => {
		if (!ref?.current) {
			return;
		}

		setWidth(ref.current.offsetWidth);
		setHeight(ref.current.offsetHeight);
	}, [ref]);

	useEffect(() => {
		window.addEventListener('load', handleResize);
		window.addEventListener('resize', handleResize);

		return () => {
			window.removeEventListener('load', handleResize);
			window.removeEventListener('resize', handleResize);
		};
	}, [ref, handleResize]);

	return { width, height };
};

export default useResize;
