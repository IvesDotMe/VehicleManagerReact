

import { createContext } from "react";
import { SnackBarActions, SnackBarState } from "../types/SnackBarActions";


export type SnackBarContextType = {
	snackBarState: SnackBarState
	dispatch: React.Dispatch<SnackBarActions>
};

export const SnackBarContext = createContext({} as SnackBarContextType);
