import * as React from 'react';
import Snackbar from '@mui/material/Snackbar';
import { SnackBarContextType, SnackBarContext } from '../context/SnackBarContext';
import { useEffect } from 'react';
import { Alert } from '@mui/material';

export default function AutohideSnackbar() {
	const { snackBarState, dispatch } = React.useContext<SnackBarContextType>(SnackBarContext);

	const [open, setOpen] = React.useState(false);

	const handleClose = (event: React.SyntheticEvent | Event, reason?: string) => {
		if (reason === 'clickaway') {
			return;
		}

		//setOpen(false);
		dispatch({ type: 'hide' });
	};

	useEffect(() => {
		console.log(snackBarState);
		setOpen(snackBarState.open);
	}, [snackBarState]);

	return (

		<Snackbar open={open} autoHideDuration={5000} onClose={handleClose}>
			<Alert onClose={handleClose} severity={snackBarState.notificationType} variant="filled" sx={{ width: '100%' }}>
				{snackBarState.message}
			</Alert>
		</Snackbar>

	);
}