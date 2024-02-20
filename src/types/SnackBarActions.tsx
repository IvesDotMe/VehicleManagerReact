export enum NotificationType {
	Success = "success",
	Error = "error",
	Warning = "warning",
	Info = "info",
}

export type SnackBarState = {
	open: boolean;
	message: string;
	notificationType: NotificationType;
};


type Show = { type: 'show'; notificationType: NotificationType, message: string };
type Hide = { type: 'hide'; };

export type SnackBarActions = Show | Hide;


export function snackBarReducer(snackBarState: SnackBarState, action: SnackBarActions) {
	switch (action.type) {
		case 'show':
			return { ...snackBarState, message: action.message, type: action.notificationType, open: true };
		case 'hide':
			return { ...snackBarState, open: false };
		default:
			return snackBarState;
	}
}