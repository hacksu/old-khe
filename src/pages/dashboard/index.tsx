import { Authenticated } from "services/auth"

import index from 'views/dashboard'

const pages = {
    index,
}

function NotFound() {
    return (<div>not found</div>)
}

export default function DashboardPage({ page }: { page?: string }) {
    page = page || 'index';
    // @ts-ignore
    const Page = page in pages ? pages[page] : NotFound;
    return Authenticated({ nav: false },
       <div>
           hi
           <Page/>
       </div>
    )
}