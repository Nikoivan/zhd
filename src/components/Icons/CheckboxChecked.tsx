import { FC } from 'react';
import { SvgIcon } from '@mui/material';
import { SvgIconLocaleProps } from './svgIcon.model';

const CheckboxChecked: FC<SvgIconLocaleProps> = ({ fontSize }) => (
	<SvgIcon fontSize={fontSize}>
		<svg
			width='28'
			height='28'
			viewBox='0 0 28 28'
			fill='none'
			xmlns='http://www.w3.org/2000/svg'>
			<rect
				x='0.5'
				y='0.5'
				width='27'
				height='27'
				rx='4.5'
				fill='white'
				stroke='#FFA800'
			/>
			<path
				d='M3.36607 14.5565L3.3834 14.5389C3.85124 14.0833 4.61364 14.0833 5.08148 14.5565C6.62362 16.1164 8.18309 17.7113 9.7079 19.2712C9.77721 19.3413 9.86385 19.3413 9.93316 19.2712C14.5769 14.574 19.1167 9.98199 23.6911 5.35492C24.159 4.88169 24.9387 4.88169 25.4065 5.35492L25.6491 5.61782C26.117 6.09104 26.117 6.86222 25.6491 7.33544C20.4856 12.5584 15.322 17.7814 10.2277 22.9343C10.1411 23.0219 10.0025 23.0219 9.91583 22.9343C7.78456 20.796 5.60131 18.5701 3.34874 16.3092C2.8809 15.8184 2.8809 15.0297 3.36607 14.5565Z'
				fill='#FFA800'
			/>
		</svg>
	</SvgIcon>
);

export default CheckboxChecked;
