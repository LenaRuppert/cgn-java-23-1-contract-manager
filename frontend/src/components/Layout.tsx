import {ReactNode} from "react";
import AppHeader from "./AppHeader";

type LayoutProps = {
    children: ReactNode
}

function Layout(props: LayoutProps) {
    return (
        <>
            <AppHeader/>
            <main className="main">{props.children}</main>
        </>
    )
}

export default Layout