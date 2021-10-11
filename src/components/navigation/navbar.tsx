
import { Box, AppBar, Toolbar, IconButton, Button } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import Link from 'next/link';

export default function NavigationBar({ toggleSidenav }: { toggleSidenav?: any }) {
    function menuClick() {
        if (toggleSidenav) toggleSidenav();
    }
    return (
        <Box sx={{ flexGrow: 1}}>
            <AppBar position="fixed">
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                        onClick={menuClick}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Link href="/login">
                        <Button color="inherit">Login</Button>
                    </Link>
                </Toolbar>
            </AppBar>
        </Box>
    )
}