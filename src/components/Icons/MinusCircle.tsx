import { FC } from 'react';
import { SvgIcon } from '@mui/material';

import { SvgIconLocaleProps } from './svgIcon.model';

const MinusCircle: FC<SvgIconLocaleProps> = ({ fontSize }) => (
	<SvgIcon fontSize={fontSize}>
		<svg
			width='32'
			height='32'
			viewBox='0 0 32 32'
			fill='none'
			xmlns='http://www.w3.org/2000/svg'>
			<circle
				cx='16'
				cy='16'
				r='15'
				stroke='#928F94'
				strokeWidth='2'
			/>
			<line
				x1='8'
				y1='16'
				x2='24'
				y2='16'
				stroke='#928F94'
				strokeWidth='2'
				strokeLinecap='round'
				strokeLinejoin='round'
			/>
		</svg>
	</SvgIcon>
);

export default MinusCircle;
