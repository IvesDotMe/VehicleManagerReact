export interface SnackBarState {
	counter: number;
	random: number;
}

type Increment = { type: 'increment'; payload: number };
type Random = { type: 'random' };

export type SnackBarActions = Increment | Random;

export function snackBarReducer(snackBarState: SnackBarState, action: SnackBarActions) {
	switch (action.type) {
		case 'increment':
			return { ...snackBarState, counter: snackBarState.counter + action.payload };
		case 'random':
			return { ...snackBarState, random: Math.random() };
		default:
			return snackBarState;
	}
}