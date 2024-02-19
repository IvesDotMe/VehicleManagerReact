import React from 'react'
import ReactDOM from 'react-dom/client'
import { ThemeProvider } from '@emotion/react'
import { CssBaseline } from '@mui/material'
import { RouterProvider } from 'react-router-dom'
import { router } from './config/Router.tsx'
import { themeDark } from './config/Theme.dark.tsx'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'
import { themeLight } from './config/Theme.light.tsx'
import localforage from 'localforage'
import MyProvider from './context/MyProvider.tsx'
import SnackBarProvider from './context/SnackBarProvider.tsx'

const theme = await localforage.getItem<string>('theme');
const s = (theme === 'light' ? themeLight : themeDark);

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<ThemeProvider theme={s}>
			<CssBaseline />
			<LocalizationProvider dateAdapter={AdapterMoment}>
				<SnackBarProvider>
					<MyProvider >
						<RouterProvider router={router} />
					</MyProvider>
				</SnackBarProvider>
			</LocalizationProvider>
		</ThemeProvider>
	</React.StrictMode>,
)