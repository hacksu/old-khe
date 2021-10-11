import { useRouter } from "next/router";

import DashboardPage from ".";
export default function() {
    const router = useRouter();
    const { page } = router.query;
    return <DashboardPage page={page as string}/>;
}