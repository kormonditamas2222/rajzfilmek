import { useEffect, useState } from "react";
import type { Rajzfilm } from "../types/Rajzfilm";
import { Rajzfilmek } from "./Rajzfilmek";

export function RajzfilmekLista() {
    const [rajzfilmek, setRajzfilmek] = useState<Rajzfilm[]>([]);
    const [legkorabbi, setLegkorabbi] = useState<number>(0);
    const [legkesobbi, setLegkesobbi] = useState(0);
    const [rajzfilmekSzama, setRajzfilmekSzama] = useState(rajzfilmek.length);
    useEffect(() => {
        async function load() {
            try {
                const response = await fetch("/rajzfilmek.json");
                if (!response.ok) {
                    throw new Error("Hiba a betöltés során!")
                }
                const data = await response.json() as Rajzfilm[];
                setRajzfilmek(data);

                setRajzfilmekSzama(data.length);
                setLegkorabbi(data[0].megjelenesEve)
                data.forEach(rajzfilm => {
                    if (rajzfilm.megjelenesEve < legkorabbi) {
                        setLegkorabbi(rajzfilm.megjelenesEve)
                    }
                    if (rajzfilm.megjelenesEve > legkesobbi) {
                        setLegkesobbi(rajzfilm.megjelenesEve);
                    }
                });
            }
            catch (error) {
                if (error instanceof Error) {
                    console.error(error);
                }
            }
        }
        load()

    }, [])



    return (
        <>
            <h2>Statisztikák</h2>
            <ul className="list-group mb-4">
                <li className="list-group-item"><b>Rajzfilmek száma: </b> {rajzfilmekSzama}</li>
                <li className="list-group-item"><b>Legkorábban megjelent rajzfilm: </b> {legkorabbi}</li>
                <li className="list-group-item"><b>Legkésőbb megjelent rajzfilm: </b> {legkesobbi}</li>
            </ul>
            <div className="row">
                {
                    rajzfilmek.map(rajzfilm => (
                        <div key={rajzfilm.id} className="col-sm-4">
                            <Rajzfilmek key={rajzfilm.id} getRajzfilm={rajzfilm} />
                        </div>
                    ))
                }
            </div>
        </>
    )
}