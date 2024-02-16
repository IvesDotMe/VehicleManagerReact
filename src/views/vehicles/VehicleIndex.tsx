
import { VehicleListView } from "./VehicleListView"
import { Outlet } from "react-router-dom"


export const VehicleIndex: React.FC = () => {

	return (
		<>
			<VehicleListView />

			<Outlet />
		</>
	)
}