import * as React from 'react';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import { SnackBarContextType, SnackBarContext } from '../context/SnackBarContext';
import { useEffect } from 'react';

export default function AutohideSnackbar() {
	const { snackBarState, dispatch } = React.useContext<SnackBarContextType>(SnackBarContext);


	const [open, setOpen] = React.useState(false);

	const handleClick = () => {
		setOpen(true);
	};

	const handleClose = (event: React.SyntheticEvent | Event, reason?: string) => {
		if (reason === 'clickaway') {
			return;
		}

		setOpen(false);
	};

	useEffect(() => {
		console.log(snackBarState.counter);
		setOpen(true);
	}, [snackBarState.counter]);

	return (
		<div>

			<Snackbar
				open={open}
				autoHideDuration={5000}
				onClose={handleClose}
				message="This Snackbar will be dismissed in 5 seconds."
			/>
		</div>
	);
}