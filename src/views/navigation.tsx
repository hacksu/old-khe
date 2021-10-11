import { useState } from "react";
import { SideNavigation, NavigationBar } from "components/navigation";

export default function Navigation() {
    const [open, setOpen] = useState(false);
    function toggleSidenav() {
        setOpen(!open);
    }
    return (
        <div>
            <SideNavigation {...{ open, setOpen }} />
            <NavigationBar {...{ toggleSidenav }} />
        </div>
    )
}