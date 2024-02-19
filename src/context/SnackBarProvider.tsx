import { useReducer } from "react";
import { snackBarReducer } from "../types/SnackBarActions";
import { SnackBarContext } from "./SnackBarContext";
import { StoreProviderProp } from "../types/StoreProviderProp";

const SnackBarProvider: React.FC<StoreProviderProp> = (props) => {

	const [snackBarState, dispatch] = useReducer(snackBarReducer, { counter: 0, random: 0 });

	return (
		<SnackBarContext.Provider value={{ snackBarState, dispatch }}>
			{props.children}
		</SnackBarContext.Provider>
	);
}


export default SnackBarProvider;