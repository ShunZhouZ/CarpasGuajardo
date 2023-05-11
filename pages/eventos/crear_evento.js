import { useState } from 'react';
import axios from "axios";
import { router } from 'next/router';

export function Form(props) {
    const [nombre_cliente, setnombre_cliente] = useState("");
    const [tipo_evento, settipo_evento] = useState("");
    const [numero_contacto_cliente, setnumero_contacto_cliente] = useState("");
    const [direccion_cliente, setdireccion_cliente] = useState("");
    const [fecha_hora_visita_terreno, setfecha_hora_visita_terreno] = useState("");
    const [showLugarVisita, setShowLugarVisita] = useState(false);
    const [fecha_inicio, setfecha_inicio] = useState("");
    const [fecha_termino, setfecha_termino] = useState("");
    const [monto_total, setmonto_total] = useState("");
    const [anticipo, setanticipo] = useState("");
    const [carpa_toldo, setcarpa_toldo] = useState("");
    const [cubre_piso, setcubre_piso] = useState("");
    function irAContacto() {
        router.push('./visualizar-admin');
      }
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if(tipo_evento === "Evento"){
                const res = await axios.post("../api/agregar_ev", {
                    tipo_evento,
                    nombre_cliente,
                    numero_contacto_cliente,
                    direccion_cliente,
                    fecha_inicio,
                    fecha_termino,
                    monto_total,
                    anticipo,
                    carpa_toldo,
                    cubre_piso
                });
                console.log(res.data);
            }else{
                const res = await axios.post("../api/agregar_ev", {
                    nombre_cliente,
                    tipo_evento,
                    numero_contacto_cliente,
                    direccion_cliente,
                    fecha_hora_visita_terreno
                });
                console.log(res.data);
            }

        } catch (err) {
            console.error(err);

        }
        };
    return (
        <form className="form-register" onSubmit={handleSubmit}>
            <h4>Agendar Evento</h4>
            <label htmlFor="tipo_evento">Tipo de evento:</label>
              <select className="controlss" value={tipo_evento} onChange={e => {
                settipo_evento(e.target.value);
                if (e.target.value === "Evento") {
                    setShowLugarVisita(true);
                } else {
                    setShowLugarVisita(false);
                }
            }}>
                <option value="">Seleccione</option>
                <option value="Evento">Evento</option>
                <option value="Visita Terreno">Visita Terreno</option>
            </select>
            <input
                className="controls"
                type="text"
                value={nombre_cliente}
                onChange={ev =>setnombre_cliente(ev.target.value)}
                name='nombre_cliente'
                id="nombres"
                placeholder="Nombre del cliente"
            />
            <input
                className="controls"
                type="text"
                value={numero_contacto_cliente}
                onChange={ev => setnumero_contacto_cliente(ev.target.value)}
                name='numero_contacto_cliente'
                id="numero_contacto_cliente"
                placeholder="Numero de contacto"
            />
            <input
                className="controls"
                type="text"
                value={direccion_cliente}
                onChange={ev => setdireccion_cliente(ev.target.value)}
                name='direccion_cliente'
                id="direccion_cliente"
                placeholder="Direccion del cliente"
            />
            {!showLugarVisita && (
                <div>
                    <label htmlFor="fecha_visita">Fecha visita:</label>
                        <input
                        className="controlss"
                        name='fecha_hora_visita_terreno'
                        value={fecha_hora_visita_terreno}
                        onChange={ev => setfecha_hora_visita_terreno(ev.target.value)}
                        type="datetime-local"
                        />
                </div>
                
            )}

            {showLugarVisita && (
                <div>
                <div>
                <label>
                    <input
                        type="checkbox"
                        checked={carpa_toldo}
                        onChange={ev => setcarpa_toldo(ev.target.checked)}
                    />
                    Carpa / Toldo
                </label>
                <label>
                    <input
                        type="checkbox"
                        checked={cubre_piso}
                        onChange={ev => setcubre_piso(ev.target.checked)}
                    />
                    Cubre Piso
                </label>
            </div>
            <label htmlFor="fecha_inicio">Fecha inicio:</label>
                        <input
                        className="controlss"
                        name='fecha_inicio'
                        value={fecha_inicio}
                        onChange={ev => setfecha_inicio(ev.target.value)}
                        type="datetime-local"
                        />
            <label htmlFor="fecha_termino">Fecha termino:</label>
                        <input
                        className="controlss"
                        name='fecha_termino'
                        value={fecha_termino}
                        onChange={ev => setfecha_termino(ev.target.value)}
                        type="datetime-local"
                        />
                        <input
                        className="controlss"
                        name='monto_total'
                        value={monto_total}
                        onChange={ev => setmonto_total(ev.target.value)}
                        type="number"
                        placeholder="Monto total"
                        />
                        <input
                        className="controlss"
                        name='anticipo'
                        value={anticipo}
                        onChange={ev => setanticipo(ev.target.value)}
                        type="number"
                        placeholder="Anticipo"
                        />
                </div>

                
            )}
            <button onClick={irAContacto} type="submit" className="botons">Guardar</button>
        </form>
    );
}

export default Form;