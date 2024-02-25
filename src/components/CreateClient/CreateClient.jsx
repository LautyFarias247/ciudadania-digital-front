import { useState } from 'react'
import style from './CreateClient.module.css'
import { createClient,editClient } from '../../lib/clients'
// import { CreateClient,editProduct } from '../../lib/products'

export default function CreateClient({ existClient,closeModal,refetch }) {
	const [client,setClient] = useState(existClient.id ? existClient : { nombre: "",email: "",direccion: "" })

	const canSave = !!client.nombre && !!client.email && !!client.direccion

	const handleCreate = async (e) => {
		try {
			e.preventDefault()
			const { error,message } = await createClient(client)

			if (error) throw new Error(message)
			alert("Cliente creado!")
		} catch (error) {
			alert(error.message || "Error al crear cliente")
		}
		refetch()
		closeModal()
	}
	const handleEdit = async (e) => {
		try {
			e.preventDefault()
			const { data,error } = await editClient(client)

			if (error) throw new Error(data)
			alert("Cliente editado!")
		} catch (error) {
			alert("Error al editar cliente")
		}
		refetch()
		closeModal()
	}
	const onChange = (e) => {
		const { name,value } = e.target
		setClient((prev) => {
			return { ...prev,[name]: value };
		});
	}

	return <div className={style.background}>
		<div className={style.modalContent}>
			<h3>{existClient.id ? "Editar cliente" : "Crear cliente"}</h3>
			<form action="" onSubmit={existClient.id ? handleEdit : handleCreate} className={style.form}>
				<div className={style.field}>
					<label htmlFor="">
						Nombre
					</label>
					<input type="text" value={client.nombre} name='nombre' onChange={onChange} />
				</div>
				<div className={style.field}>
					<label htmlFor="">
						Email
					</label>
					<input type="text" value={client.email} name="email" onChange={onChange} />
				</div>
				<div className={style.field}>
					<label htmlFor="">
						Dirección
					</label>
					<input type="text" value={client.direccion} name="direccion" onChange={onChange} />
				</div>
				<div className={style.buttonContainer}>
					<button type='button' onClick={closeModal} className={style.actionButton} style={{ backgroundColor: "#ff2929" }}>Cancelar</button>
					<button disabled={!canSave} type="submit" className={`${style.actionButton} ${!canSave && style.disabled}`} style={{ backgroundColor: "#4973ff" }}>Guardar</button>
				</div>
			</form>
		</div>
	</div>
}