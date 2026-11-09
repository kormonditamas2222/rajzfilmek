import { useEffect, useState } from "react";
import { type Rajzfilm } from "../types/Rajzfilm";
import { Rajzfilmek } from "./Rajzfilmek";

export function RajzfilmekLista() {
    const [rajzfilmek, setRajzfilmek] = useState<Rajzfilm[]>([]);
    useEffect(() => {
        async function load() {
            try {
                const response = await fetch("/rajzfilmek.json");
                if (!response.ok) {
                    throw new Error("Hiba a betöltés során!")
                }
                const data = await response.json() as Rajzfilm[];
                setRajzfilmek(data);
            }
            catch (error) {
                if (error instanceof Error) {
                    console.error(error);
                }
            }
        }
        load()
    }, [])

    const rajzfilmekSzama = rajzfilmek.length;
    let legkorabbi = rajzfilmek[0].megjelenesEve;
    let legkesobbi = 0;
    rajzfilmek.forEach(rajzfilm => {
        if (rajzfilm.megjelenesEve < legkorabbi) {
            legkorabbi = rajzfilm.megjelenesEve;
        }
        if (rajzfilm.megjelenesEve > legkesobbi) {
            legkesobbi = rajzfilm.megjelenesEve;
        }
    });
    
    return (
        <>
            <h2>Statisztikák</h2>
            <ul className="list-group">
                <li className="list-group-item"><b>Rajzfilmek száma: </b> {rajzfilmekSzama}</li>
                <li className="list-group-item"><b>Legkorábban megjelent rajzfilm: </b> {legkorabbi}</li>
                <li className="list-group-item"><b>Legkésőbb megjelent rajzfilm: </b> {legkesobbi}</li>              
            </ul>
            <div className="row">
                {
                    rajzfilmek.map(rajzfilm => (
                        <div className="col-sm-4">
                            <Rajzfilmek key={rajzfilm.id} getRajzfilm={rajzfilm}/>
                        </div>
                    ))
                }
            </div>
        </>
    )
}