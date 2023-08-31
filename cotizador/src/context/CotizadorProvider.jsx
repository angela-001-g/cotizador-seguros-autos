/* eslint-disable react/prop-types */

import { useState, createContext } from "react";
import { obtenerDiferenciaYear, calcularMarca, calcularPlan, formatearDinero } from "../helpers"

const CotizadorContext = createContext()

const CotizadorProvider = ({children}) => {

    const [datos, setDatos] = useState({
        marca: '',
        year: '', 
        plan:'',
    })

    const [error, setError] = useState('')

    const handleChangeDatos = e => {
        setDatos({
            ...datos,
            [e.target.name]: e.target.value
        })
    }

    const cotizarSeguro = () => {
        // Una base
        let resultado = 2000; 
        // Obtener diferencia de años
        const diferencia = obtenerDiferenciaYear(datos.year)
        // Hay que restar el 3% por cada año anterior
        resultado -= ((diferencia * 3) * resultado)/100
        // Americano 15%
        // Europeo 30% 
        // Asiatico 5%
        resultado *= calcularMarca(datos.marca)
        // Basico 20%
        // Completo 50%
        resultado *= calcularPlan(datos.plan)
        // Formatear Dinero 
        resultado = formatearDinero(resultado)

        console.log(resultado)
    }


    return(
         <CotizadorContext.Provider
            value={{
                datos,
                handleChangeDatos,
                error, 
                setError,
                cotizarSeguro
            }}
         >
                {children}
         </CotizadorContext.Provider>
    )
}

export {
    CotizadorProvider
}

export default CotizadorContext