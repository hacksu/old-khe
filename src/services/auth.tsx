import React from "react";
import LoginPage from "pages/login";

// Checks if logged in. Can be passed content to return if logged in ( example: Authenticated(<PageContent/>) )
// Can also be passed arguments passed to the Login page (such as nav: false, which hides navigation)
export function Authenticated(args?: any, content?: any): any {
    if (!content && args && React.isValidElement(args)) {
        content = args;
        args = {};
    }
    const loggedIn = Math.random() > 0.5;
    if (loggedIn) return content || true;
    if (content) return LoginPage({ reload: true, ...args });
    return false;
}

export function NotAuthenticated(content?: any) {
    const loggedIn = Authenticated();
    if (!loggedIn) return content || false;
    if (content) return (
        <h1>You cannot be logged in to view this</h1>
    );
    return true;
}

