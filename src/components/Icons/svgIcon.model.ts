import { IClassNameProps } from '@bem-react/core';
import { SvgIconProps } from '@mui/material';

export type SvgIconLocaleProps = {
	fontSize?: 'inherit' | 'large' | 'medium' | 'small';
	color?: string;
} & IClassNameProps &
	SvgIconProps;
