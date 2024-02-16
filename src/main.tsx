import React from 'react'
import ReactDOM from 'react-dom/client'
import { ThemeProvider } from '@emotion/react'
import { CssBaseline } from '@mui/material'
import { RouterProvider } from 'react-router-dom'
import { router } from './config/Router.tsx'
import { darkTheme } from './config/Theme.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<ThemeProvider theme={darkTheme}>
			<CssBaseline />
			<RouterProvider router={router} />
		</ThemeProvider>
	</React.StrictMode>,
)
