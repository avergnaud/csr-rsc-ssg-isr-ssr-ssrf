import { Link, Outlet } from "react-router-dom"

export default function RootLayout() {
    return <>
        <header>
            <ul>
                <li><Link to='/app'>App page</Link></li>
                <li><Link to='/page1'>Page 1</Link></li>
            </ul>
        </header>
        <main>
            <Outlet />
        </main>
    </>
};