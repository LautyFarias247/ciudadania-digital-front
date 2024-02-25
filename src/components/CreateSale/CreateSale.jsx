import { useEffect,useState } from 'react'
import style from './CreateSale.module.css'
import useClients from '../../hooks/useClients'
import useProducts from '../../hooks/useProducts'
import { createSale } from '../../lib/sales'

export default function CreateSale({ existSale,closeModal,refetch }) {
	const { clients } = useClients()
	const { products } = useProducts()

	const [sale,setSale] = useState(existSale?.id ? existSale : { id_producto: 0,cantidad: "",id_cliente: 0,estado: "" })

	const canSave = !!sale.id_producto && !!sale.cantidad && !!sale.id_cliente && !!sale.estado

	const handleCreate = async (e) => {
		try {
			e.preventDefault()
			const { data,error } = await createSale(sale)

			if (error) throw new Error(data)
			alert("Venta creada!")
		} catch (error) {
			alert("Error al crear cliente")
		}
		refetch()
		closeModal()
	}

	const onChange = (e) => {
		const { name,value } = e.target
		setSale((prev) => {
			return { ...prev,[name]: value };
		});
	}
	useEffect(() => {
		console.log({ sale })
	},[sale])

	return <div className={style.background}>
		<div className={style.modalContent}>
			<h3>{existSale?.id ? "Editar venta" : "Crear venta"}</h3>
			<form action="" onSubmit={handleCreate} className={style.form}>
				<div className={style.field}>
					<label htmlFor="">
						Producto
					</label>
					<select name='id_producto' value={sale.id_producto} onChange={onChange}>
						<option value={0}>Selecciona un producto</option>
						{products?.map((c,i) => {
							return <option key={i} value={c.id}>{c.nombre}</option>
						})}
					</select>
				</div>
				<div className={style.field}>
					<label htmlFor="">
						Cantidad
					</label>
					<input type="number" value={sale.cantidad} name="cantidad" onChange={onChange} />
				</div>
				<div className={style.field}>
					<label htmlFor="">
						Cliente
					</label>
					<select name='id_cliente' value={sale.id_cliente} onChange={onChange}>
						<option value={0}>Selecciona un cliente</option>
						{clients?.map((c,i) => {
							return <option key={i} value={c.id}>{c.nombre}</option>
						})}
					</select>
				</div>
				<div className={style.field}>
					<label htmlFor="">
						Estado
					</label>
					<select name='estado' onChange={onChange}>
						<option value={0}>Selecciona un estado</option>
						<option value={"entregado"}>Entregado</option>
						<option value={"pagado"}>Pagado</option>
						<option value={"en proceso"}>En proceso</option>
					</select>
				</div>
				<div className={style.buttonContainer}>
					<button type='button' onClick={closeModal} className={style.actionButton} style={{ backgroundColor: "#ff2929" }}>Cancelar</button>
					<button disabled={!canSave} type="submit" className={`${style.actionButton} ${!canSave && style.disabled}`} style={{ backgroundColor: "#4973ff" }}>Guardar</button>
				</div>
			</form>
		</div>
	</div>
}