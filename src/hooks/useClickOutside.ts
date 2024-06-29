import { MutableRefObject, useEffect } from 'react';

const useClickOutside = (ref: MutableRefObject<Element | null>, callback: () => void) => {
	const handleClick = (evt: MouseEvent) => {
		if (ref?.current && !ref.current.contains(evt.target as Node)) {
			callback();
		}
	};

	useEffect(() => {
		document.addEventListener('mousedown', handleClick);
		return () => {
			document.removeEventListener('mousedown', handleClick);
		};
	});
};

export default useClickOutside;
