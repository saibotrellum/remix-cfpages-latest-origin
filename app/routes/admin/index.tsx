import { Outlet } from "@remix-run/react";
import { Link } from "@remix-run/react";
import {Button} from "react-bootstrap";

const contacts=[];



export default function Admin() {
    return (
        <main style={{ padding: "1rem" }}>
            <p>
                Set Fake Data! -
                <Button type="submit" name="setFake" value="all">Alle setzen</Button>
                {contacts.map((value, index, array)=>{

                })}
                <Link to="/contacts">App Dashboard - gehe zu Kontakt Dashboard</Link>
                {/*{*/}
                {/*  // @ts-ignore*/}
                {/*  app.route?.url.pathname*/}
                {/*}*/}
            </p>
        </main>
    );
}