import {Link} from "@remix-run/react";

export default function Index() {
    return (
        <main style={{padding: '1rem'}}>
            <p>
                Kontakte Dashboard! - -
                <Link to="/contacts/edit/1234">Simuliere Kontaktsuche und -auswahl, gehe zu
                    Bearbeitungs-Ansicht</Link>
            </p>
        </main>
    );
}
