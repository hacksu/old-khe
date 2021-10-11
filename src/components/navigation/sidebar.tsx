
import { useState } from "react"
import { Box, SwipeableDrawer } from "@mui/material"

export default function SideNavigation({ open, setOpen }: { open?: boolean, setOpen?: any }) {
    if (!setOpen) {
        [open, setOpen] = useState(true);
    }
    function toggleDrawer() {
        setOpen(!open);
    }
    function onClose() {
        console.log('closed')
        if (open) toggleDrawer();
    }
    function onOpen() {
        console.log('opened')
        if (!open) toggleDrawer();
    }
    return (
        // @ts-ignore
        <SwipeableDrawer {...{open, onClose, onOpen}} anchor="left">
            <Box sx={{ width: 250 }}>
                hi there
            </Box>
        </SwipeableDrawer>
    )
}