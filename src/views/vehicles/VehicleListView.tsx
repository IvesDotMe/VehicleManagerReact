import { useCallback, useContext, useEffect, useRef, useState } from "react"
import { IVehicleService } from "../../services/IVehicleService"
import { VehicleDto } from "../../types/Vehicle";
import { TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody, Button } from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import { VehicleService } from "../../services/VehicleService";
import { MyContextType, MyContext } from "../../context/MyContext";
import ConfirmDialog from "../../components/ConfirmDialog";
import { useSnackbar } from "notistack";
//import { SnackBarContextType, SnackBarContext } from "../../context/SnackBarContext";

export const VehicleListView: React.FC = () => {
	const { enqueueSnackbar } = useSnackbar();
	const { s } = useContext<MyContextType>(MyContext);
	//const { snackBarState } = useContext<SnackBarContextType>(SnackBarContext);

	const vehicleService = useRef<IVehicleService>(new VehicleService());
	const [loading, setLoading] = useState(true);
	const [vehicleData, setVehicleData] = useState<VehicleDto[]>([]);
	const location = useLocation();

	const fetchData = useCallback(async () => {
		setLoading(true);
		const data = await vehicleService.current.GetList();
		setVehicleData(data);
		setLoading(false);
	}, [vehicleService]);

	useEffect(() => {
		fetchData();
	}, [fetchData, location]);


	const [confirmOpen, setConfirmOpen] = useState(false);
	const [idToDelete, setIdToDelete] = useState('');

	const deletePost = async () => {
		console.log(idToDelete);
		await vehicleService.current.Delete(idToDelete);
		enqueueSnackbar('Deleted');
		fetchData();
	}

	return <>
		{loading
			? 'Loading ...'
			:
			<>
				<TableContainer component={Paper}>
					<Table sx={{ minWidth: 650 }} aria-label="simple table">
						<TableHead>
							<TableRow>
								<TableCell>Name {s}</TableCell>
								<TableCell>License Plate</TableCell>
								<TableCell>Available</TableCell>
								<TableCell>Purchase Date</TableCell>
								<TableCell>Make</TableCell>
								<TableCell align="center">Actions</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{vehicleData.map((row) => (
								<TableRow key={row.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}	>
									<TableCell component="th" scope="row"> {row.name} </TableCell>
									<TableCell>{row.licensePlate}</TableCell>
									<TableCell>{row.isActive ? 'Yes' : 'Nah'}</TableCell>
									<TableCell>{row.purchaseMoment?.format('MMM/YYYY')}</TableCell>
									<TableCell>{row.makeId}</TableCell>
									<TableCell align="center">  <Button component={Link} to={`/vehicles/${row.id}`}>Edit</Button>
										<Button onClick={() => { setIdToDelete(row.id); setConfirmOpen(true) }}>Delete</Button></TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</TableContainer>
				<ConfirmDialog
					title="Delete Post?"
					open={confirmOpen}
					setOpen={setConfirmOpen}
					onConfirm={deletePost}
				>
					Are you sure you want to delete this post?
				</ConfirmDialog>
			</>
		}
	</>;
}