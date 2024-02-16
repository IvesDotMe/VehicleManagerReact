import { Navigate, createBrowserRouter } from "react-router-dom";
import Form1 from "../views/Form";
import { VehicleIndex } from "../views/vehicles/VehicleIndex";
import Layout from "../components/Layout";


export const router = createBrowserRouter([
	{
		element: <Layout />,
		errorElement: <>Disaster</>,

		children: [
			{
				path: '/',
				element: <Navigate to='/vehicles/' replace />,
			},
			{
				path: "/vehicles/",
				element: <VehicleIndex />,
				children: [
					{
						path: '/vehicles/:vehicleId',
						element: <Form1></Form1>
					}
				]
			},
		]
	},


]);