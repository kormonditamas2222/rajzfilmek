import { useState } from "react";
import type { Rajzfilm } from "../types/Rajzfilm";

interface rajzfilmProps {
    getRajzfilm: Rajzfilm;
}

export function Rajzfilmek(props: rajzfilmProps) {
    const [datumMegjelenitve, setMegjelenes] = useState(true);
    return (
        <>
            <section className="card mb-4 p-3">
                <h2 className="card-title">{props.getRajzfilm.cim}</h2>
                <p className="card-text"><i>{props.getRajzfilm.studio}</i></p>
                <p className="card-text">
                    { props.getRajzfilm.megjelenesEve < 2000 ? <b>Klasszikus rajzfilm</b> : 
                    props.getRajzfilm.megjelenesEve > 2010 ? <b>Modern rajzfilm</b> : 
                    <i>Régebbi rajzfilm</i> }
                </p>
                {datumMegjelenitve && <p className="card-text">Premier dátuma: {props.getRajzfilm.premier}</p>}
                <button className="btn btn-primary" onClick={() => setMegjelenes(most => !most)}>Premier</button>
            </section>
        </>
    )
}