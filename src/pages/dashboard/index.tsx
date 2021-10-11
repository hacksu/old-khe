import { Authenticated } from "services/auth"

export default function DashboardPage({ page }: { page?: string }) {
    return Authenticated({ nav: false },
        <div>{page || 'index'}</div>
    )
}