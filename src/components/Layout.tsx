import { Box, AppBar, Toolbar, IconButton, Typography, Button } from "@mui/material"
import AgricultureIcon from '@mui/icons-material/Agriculture';
import { Link, Outlet } from "react-router-dom";

export default function Layout() {
	return (
		<Box sx={{ flexGrow: 1 }}>
			<AppBar position="sticky">
				<Toolbar>
					<IconButton size="large" edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
						<AgricultureIcon />
					</IconButton>
					<Typography variant="h6" component="div" sx={{ flexGrow: 1, letterSpacing: '.3rem' }}>
						MACHINAS MANAGER
					</Typography>
					<Button color="inherit" component={Link} to={`/vehicles/insert`} >Insert Vehicle</Button>
				</Toolbar>
			</AppBar>
			<Outlet></Outlet>
		</Box>
	)
}