import { createTheme } from '@mui/material/styles';

export const themeLight = createTheme({
	palette: {
		mode: 'light',
	},

	components: {
		MuiToggleButton: {
			styleOverrides: {
				root: {
					"&.Mui-selected": {
						color: "#000000",
						backgroundColor: '#fefefe',
						"&:hover": {
							color: '#000000',
							backgroundColor: '#fefefe'
						}
					},

				}
			}
		}
	}
});