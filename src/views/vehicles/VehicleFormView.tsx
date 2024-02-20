import { AppBar, Box, Button, Drawer, FormControl, IconButton, InputLabel, MenuItem, Paper, Select, Switch, TextField, Toolbar, Typography } from "@mui/material";
import { useCallback, useContext, useEffect, useRef, useState } from "react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import CloseIcon from '@mui/icons-material/Close';
import SendIcon from '@mui/icons-material/Send';
import { VehicleDto } from "../../types/Vehicle";
import { DatePicker } from "@mui/x-date-pickers";
import { IVehicleService } from "../../services/IVehicleService";
import { VehicleService } from "../../services/VehicleService";
import { MyContextType, MyContext } from "../../context/MyContext";
import { SnackBarContext, SnackBarContextType } from "../../context/SnackBarContext";
import { NotificationType } from "../../types/SnackBarActions";
import { VariantType, useSnackbar } from "notistack";

export default function VehicleFormView() {
	const { enqueueSnackbar } = useSnackbar();

	const { saveS } = useContext<MyContextType>(MyContext);

	const { dispatch } = useContext<SnackBarContextType>(SnackBarContext);

	const navigate = useNavigate();
	const params = useParams();
	const [drawerOpen, setDrawerState] = useState(false);
	const vehicleService = useRef<IVehicleService>(new VehicleService());
	const { register, handleSubmit, formState, control, reset } = useForm<VehicleDto>({ defaultValues: { isActive: true, name: '', licensePlate: '' } });
	const onSubmit: SubmitHandler<VehicleDto> = async data => {
		saveS('hey');
		console.log(data);
		await vehicleService.current.Save(data);
		navigate('/vehicles', { replace: true });
	}

	const fetchData = useCallback(async () => {
		if (params['vehicleId'] !== 'insert' && params['vehicleId']) {
			const data = await vehicleService.current.GetOne(params['vehicleId'])
			reset(data);
		}
	}, [params, reset]);

	useEffect(() => {
		fetchData();
		setDrawerState(true);
	}, [fetchData]);

	const handleClickVariant = (variant: VariantType) => () => {
		// variant could be success, error, warning, info, or default
		enqueueSnackbar('This is a success message!', { variant });
	};

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

				<button onClick={() => dispatch({ type: 'show', notificationType: NotificationType.Success, message: 'Yep Saved' })}>
					"Increment" Action
				</button>
				<button onClick={() => dispatch({ type: 'hide' })}>
					"Random" Action
				</button>
				<Button onClick={handleClickVariant('success')}>Show success snackbar</Button>
				{/* {snackBarState.counter} - {snackBarState.random} */}
				<form onSubmit={handleSubmit(onSubmit)}>
					<input type="hidden" {...register('id')} />
					<Box sx={{ display: 'flex', justifyContent: 'space-between', p: 1, mb: 1 }}>
						<Typography variant="h6" gutterBottom>
							Active
						</Typography>
						<Controller name="isActive" control={control}
							render={({ field }) => <Switch defaultChecked {...field} />}
						/>
					</Box>

					<Controller name="makeId" control={control}
						render={({ field }) =>
							<FormControl fullWidth>
								<InputLabel id="demo-simple-select-label">Make</InputLabel>
								<Select
									id="demo-simple-select"
									value={field.value ? field.value : ''}
									label="Make"
									onChange={field.onChange}
									sx={{ mb: 3 }}
								>
									<MenuItem value={'vw'}>VW</MenuItem>
									<MenuItem value={'bmw'}>BMW</MenuItem>
									<MenuItem value={'ferrari'}>Ferrari</MenuItem>
								</Select>
							</FormControl>
						} />

					<Controller name="name" control={control}
						render={({ field }) => <TextField required fullWidth label={'Name'} {...field} sx={{ mb: 3 }} />}
					/>

					<Controller name="licensePlate" control={control}
						render={({ field }) => <TextField required fullWidth label={'License Plate'} {...field} sx={{ mb: 3 }} />}
					/>

					<Controller
						control={control}
						name="purchaseMoment"
						rules={{ required: true }}
						render={({ field }) => {
							return (
								<DatePicker
									label="Purchase Date"
									value={field.value ? field.value : null}
									inputRef={field.ref}
									sx={{ mb: 3 }}
									slotProps={{ textField: { fullWidth: true } }}
									views={['month', 'year']}
									onChange={(date) => {
										field.onChange(date);
									}}
								/>
							);
						}}
					/>

					<Button variant="contained" endIcon={<SendIcon />} type="submit">Send</Button>

				</form>
				<pre>{JSON.stringify(formState, null, 2)}</pre>
			</Paper>
		</Drawer >



	);
}