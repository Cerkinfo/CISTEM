import { Outlet } from "react-router-dom";

export default function List() {
    return (
        <section className="list">
            <Outlet />
        </section>
    )
}