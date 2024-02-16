import { useCallback, useEffect, useRef, useState } from "react"
import { IVehicleService } from "../../services/IVehicleService"
import { VehicleMockService } from "../../services/VehicleMockService"
import { Vehicle } from "../../types/Vehicle";
import { TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody, Button } from "@mui/material";
import { Link } from "react-router-dom";

export const VehicleListView: React.FC = () => {
	const vehicleService = useRef<IVehicleService>(new VehicleMockService());
	const [loading, setLoading] = useState(true);
	const [vehicleData, setVehicleData] = useState<Vehicle[]>([]);

	const fetchData = useCallback(async () => {
		setLoading(true);
		const data = await vehicleService.current.GetList();
		console.log(data)
		setVehicleData(data);
		setLoading(false);
	}, [vehicleService]);

	useEffect(() => {
		fetchData();
	}, [fetchData]);
	return <>
		{loading
			? 'Loading ...'
			:
			<TableContainer component={Paper}>
				<Table sx={{ minWidth: 650 }} aria-label="simple table">
					<TableHead>
						<TableRow>
							<TableCell>Name</TableCell>
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
								<TableCell>{row.isAvailable ? 'Yes' : 'Nah'}</TableCell>
								<TableCell>{row.purchaseDate.toDateString()}</TableCell>
								<TableCell>{row.makeId}</TableCell>
								<TableCell align="center">  <Button component={Link} to={`/vehicles/1`}>Edit</Button>
									<Button component={Link} to={`/vehicles/1`}>Delete</Button></TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>
		}
	</>;
}