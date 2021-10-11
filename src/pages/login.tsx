
import Navigation from "views/navigation";
import Login from "views/login";

interface LoginPageProps {
    reload?: boolean; // reload page on login instead of redirect
    nav?: boolean; // weather navigation is visible or not
}

export default function LoginPage({ 
    reload = false, 
    nav = true
}: LoginPageProps) {
    return (
        <div>
            {nav && <Navigation/>}
            <h1>Login</h1>
            <Login/>
        </div>
    )
}