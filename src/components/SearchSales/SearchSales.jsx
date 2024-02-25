import { useState } from "react"
import style from "./SearchSales.module.css"
import { fetchClientSales } from "../../lib/sales"

export default function SearchSales({ closeModal,clients }) {
	const [monto,setMonto] = useState(null)
	const [cliente,setCliente] = useState("")
	const [ventas,setVentas] = useState([])

	const [loading,setLoading] = useState(false)

	const canSearch = !!cliente && !!monto

	const handleSearch = async (e) => {
		try {
			e.preventDefault()
			setLoading(true)

			const response = await fetchClientSales(cliente,monto)
			setVentas(response)

		} catch (error) {
			alert("Error al solicitar ventas")
		}
		setLoading(false)
	}





	return <div className={style.background}>
		{loading && <div style={{ position: "absolute",top: 0,right: 0,left: 0,margin: "auto" }}>Cargando</div>}
		<div className={style.modalContent}>
			<h3>{`Buscar ventas por cliente`}</h3>
			<form action="" onSubmit={handleSearch} className={style.form}>
				<div className={style.field}>
					<label htmlFor="">
						Cliente
					</label>
					<select name='id_cliente' value={cliente} onChange={(e) => {
						setCliente(e.target.value)
					}}>
						<option value={""}>Selecciona un cliente</option>
						{clients?.map((c,i) => {
							return <option key={i} value={c.email}>{c.email}</option>
						})}
					</select>
				</div>
				<div className={style.field}>
					<label htmlFor="">Monto mayor a:</label>
					<input type="number" value={monto} name="monto" onChange={(e) => { setMonto(e.target.value) }} />
				</div>
				{
					ventas?.length > 0 &&
					<div>{
						ventas?.map((venta) => {
							return <div style={{ display: "flex",flexDirection: "row",justifyContent: "flex-start",gap: "1rem" }}>
								<span>ID: {venta.id}</span>
								<span>Fecha: {getDate(venta.fecha)}</span>
								<span>Monto: {venta.monto_total}</span>
							</div>
						})
					}
					</div>
				}
				<div className={style.buttonContainer}>
					<button type='button' onClick={closeModal} className={style.actionButton} style={{ backgroundColor: "#ff2929" }}>Cancelar</button>
					<button disabled={!canSearch} type="submit" className={`${style.actionButton} ${!canSearch && style.disabled}`} style={{ backgroundColor: "#4973ff" }}>Buscar</button>
				</div>
			</form>
		</div>
	</div >
}

function getDate(date) {
	const parsedDate = new Date(date)

	parsedDate.setHours(parsedDate.getHours() + 3);

	const day = parsedDate.getDate().toString().padStart(2,'0');;
	const month = (parsedDate.getMonth() + 1).toString().padStart(2,'0');;
	const year = parsedDate.getFullYear();
	const hour = parsedDate.getHours().toString().padStart(2,'0');;
	const minutes = parsedDate.getMinutes().toString().padStart(2,'0');;

	return `${day}/${month}/${year} ${hour}:${minutes}`
}