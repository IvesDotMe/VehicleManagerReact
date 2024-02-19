import { Box, AppBar, Toolbar, IconButton, Typography, Button, ToggleButton, ToggleButtonGroup } from "@mui/material"
import AgricultureIcon from '@mui/icons-material/Agriculture';
import { Link, Outlet } from "react-router-dom";
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import { useCallback, useEffect, useState } from "react";
import localforage from "localforage";
import AutohideSnackbar from "./SnackBar";

export default function Layout() {
	const [alignment, setAlignment] = useState<string>('dark');
	const handleAlignment = (event: React.MouseEvent<HTMLElement>, newAlignment: string) => {
		if (newAlignment) {
			localforage.setItem<string>('theme', newAlignment!);
			window.location.reload()
		}
	};

	const fetchTheme = useCallback(async () => {
		const theme = await localforage.getItem<string>('theme');
		setAlignment(theme ?? 'dark');
	}, []);

	useEffect(() => {
		fetchTheme();
	}, [fetchTheme]);


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
					<Button color="inherit" component={Link} to={`/vehicles/insert`} sx={{ mr: 5 }}>Insert Vehicle</Button>


					<ToggleButtonGroup color="primary" value={alignment} exclusive onChange={handleAlignment}>
						<ToggleButton value="light"><LightModeIcon /></ToggleButton>
						<ToggleButton value="dark"><DarkModeIcon /></ToggleButton>
					</ToggleButtonGroup>
				</Toolbar>
			</AppBar>
			<Outlet></Outlet>
			<AutohideSnackbar></AutohideSnackbar>
		</Box>
	)
}