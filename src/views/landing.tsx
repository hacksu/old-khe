// Main landing page for KHE
import Link from 'next/link';
import { Button } from '@mui/material';

export default function Landing() {
    return (
        <div id="landing">
            <h1>[ Landing ]</h1>
            <Link href="/register">
                <Button>Register</Button>
            </Link>
        </div>
    )
}