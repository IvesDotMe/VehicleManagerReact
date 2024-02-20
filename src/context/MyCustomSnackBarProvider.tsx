import { useReducer } from "react";
import { NotificationType, snackBarReducer } from "../types/SnackBarActions";
import { SnackBarContext } from "./SnackBarContext";
import { StoreProviderProp } from "../types/StoreProviderProp";

const MyCustomSnackBarProvider: React.FC<StoreProviderProp> = (props) => {

	const initialState = {
		open: false,
		message: "",
		notificationType: NotificationType.Success,
	};
	const [snackBarState, dispatch] = useReducer(snackBarReducer, initialState);

	return (
		<SnackBarContext.Provider value={{ snackBarState, dispatch }}>
			{props.children}
		</SnackBarContext.Provider>
	);
}


export default MyCustomSnackBarProvider;