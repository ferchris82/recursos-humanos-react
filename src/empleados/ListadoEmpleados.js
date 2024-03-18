import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { FormattedNumber, IntlProvider } from 'react-intl';

export default function ListadoEmpleados() {

    const urlBase = "http://localhost:8080/rh-app/empleados";

    const [empleados, setEmpleados] = useState([]);

    useEffect(() => {
        cargarEmpleados();
    }, []);

    const cargarEmpleados = async () => {
        const resultado = await axios.get(urlBase);
        console.log("Resultado cargar empleados");
        console.log(resultado.data);
        setEmpleados(resultado.data);
    }

    return (
        <IntlProvider locale="es">
            <div className="container">
                <div className="container text-center" style={{ margin: "30px" }}>
                    <h3>Sistema de Recursos Humanos</h3>
                </div>

                <table className="table table-striped table-hover align-middle">
                    <thead className="table-dark">
                        <tr>
                            <th scope="col">Id</th>
                            <th scope="col">Empleado</th>
                            <th scope="col">Departamento</th>
                            <th scope="col">Sueldo</th>
                        </tr>
                    </thead>
                    <tbody>
                        {empleados.map((empleado, indice) => (
                            <tr key={indice}>
                                <th scope="row">{empleado.idEmpleado}</th>
                                <td>{empleado.nombre}</td>
                                <td>{empleado.departamento}</td>
                                <td>
                                    <td>${<FormattedNumber
                                        value={empleado.sueldo}
                                        style="decimal"
                                        minimumFractionDigits={2}
                                        maximumFractionDigits={2}
                                    />}</td>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </IntlProvider>
    )
}
