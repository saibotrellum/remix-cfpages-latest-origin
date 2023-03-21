import { Outlet } from "@remix-run/react";
import { Link } from "@remix-run/react";

export default function Index() {
    return (
        <main style={{ padding: "1rem" }}>
            <p>
                App Dashboard! -
                <Link to="/contacts">App Dashboard - gehe zu Kontakt Dashboard</Link>
                {/*{*/}
                {/*  // @ts-ignore*/}
                {/*  app.route?.url.pathname*/}
                {/*}*/}
            </p>
        </main>
    );
}