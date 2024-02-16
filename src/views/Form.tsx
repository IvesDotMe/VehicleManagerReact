import { AppBar, Box, Button, Drawer, FormControlLabel, IconButton, Input, Paper, Switch, TextField, Toolbar, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import CloseIcon from '@mui/icons-material/Close';
import SendIcon from '@mui/icons-material/Send';
import { Vehicle } from "../types/Vehicle";


export default function Form1() {
	const navigate = useNavigate();
	const params = useParams();
	const [drawerOpen, setDrawerState] = useState(false);

	const { register, handleSubmit, watch, formState: { errors }, control } = useForm<Vehicle>();
	const onSubmit: SubmitHandler<Vehicle> = data => console.log(data);

	//console.log(watch("example")) // watch input value by passing the name of it

	useEffect(() => {
		console.log(params['vehicleId'])
		setDrawerState(true);
	}, [params]);

	return (

		<Drawer anchor={"right"} open={drawerOpen} onClose={() => navigate(-1)} >
			<AppBar position="static" color="primary" >
				<Toolbar>
					<Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
						Vehicle
					</Typography>
					<IconButton edge="start" color="inherit" aria-label="menu" onClick={() => navigate(-1)}>
						<CloseIcon />
					</IconButton>
				</Toolbar>
			</AppBar>
			<Paper sx={{ p: 3, width: '600px' }}>
				<form onSubmit={handleSubmit(onSubmit)}>

					<FormControlLabel control={<Switch defaultChecked />} label="Label" />
					<Controller name="name" control={control}
						render={({ field }) => <TextField required fullWidth label={'Name'} {...field} sx={{ mb: 3 }} />}
					/>

					<Controller name="licensePlate" control={control}
						render={({ field }) => <TextField required fullWidth label={'License Plate'} {...field} sx={{ mb: 3 }} />}
					/>

					<Button variant="contained" endIcon={<SendIcon />} type="submit">Send</Button>

				</form>
			</Paper>
		</Drawer >



	);
}