import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from "@mui/material";

export type ConfirmDialogProps = {
	title: string;
	children: JSX.Element | string;
	open: boolean;
	setOpen: (value: boolean) => void;
	onConfirm: () => void;
}


const ConfirmDialog = (props: ConfirmDialogProps) => {
	//const { title, children, open, setOpen, onConfirm } = props;
	return (
		<Dialog
			open={props.open}
			onClose={() => props.setOpen(false)}
			aria-labelledby="confirm-dialog"
		>
			<DialogTitle id="confirm-dialog">{props.title}</DialogTitle>
			<DialogContent>{props.children}</DialogContent>
			<DialogActions>
				<Button
					variant="contained"
					onClick={() => props.setOpen(false)}
					color="secondary"
				>
					No
				</Button>
				<Button variant="contained" onClick={() => { props.setOpen(false); props.onConfirm(); }}>
					Yes
				</Button>
			</DialogActions>
		</Dialog>
	);
};

export default ConfirmDialog;