import { useState } from 'react'
import style from './CreateProduct.module.css'
import { createProduct,editProduct } from '../../lib/products'

export default function CreateProduct({ existProduct,closeModal,refetch }) {
	const [product,setProduct] = useState(existProduct.id ? existProduct : { name: "",description: "",price: null,quantity: null })

	const canSave = !!product.name && !!product.price && !!product.quantity

	const handleCreate = async (e) => {
		try {
			e.preventDefault()
			const { data,error,message } = await createProduct(product)

			if (error) throw new Error(message)


			alert("Producto creado!")
		} catch (error) {
			console.log(error)
			alert(error.message || "Error al crear producto")
		}
		refetch()
		closeModal()
	}
	const handleEdit = async (e) => {
		try {
			e.preventDefault()
			const { data,error } = await editProduct(product)

			if (error) throw new Error(data)
			alert("Producto editado!")
		} catch (error) {

			alert("Error al editar producto")
		}
		refetch()
		closeModal()
	}
	const onChange = (e) => {
		const { name,value } = e.target
		setProduct((prev) => {
			return { ...prev,[name]: value };
		});
	}

	return <div className={style.background}>
		<div className={style.modalContent}>
			<h3>{existProduct.id ? "Editar producto" : "Crear producto"}</h3>
			<form action="" onSubmit={product.id ? handleEdit : handleCreate} className={style.form}>
				<div className={style.field}>
					<label htmlFor="">
						Nombre
					</label>
					<input type="text" value={product.name} name='name' onChange={onChange} />
				</div>
				<div className={style.field}>
					<label htmlFor="">
						Descripción
					</label>
					<textarea type="text" value={product.description} name="description" onChange={onChange} />
				</div>
				<div className={style.field}>
					<label htmlFor="">
						Precio
					</label>
					<input type="number" value={product.price} name="price" onChange={onChange} />
				</div>
				<div className={style.field}>
					<label htmlFor="">
						Cantidad
					</label>
					<input type="number" value={product.quantity} name="quantity" onChange={onChange} />
				</div>
				<div className={style.buttonContainer}>
					<button type='button' onClick={closeModal} className={style.actionButton} style={{ backgroundColor: "#ff2929" }}>Cancelar</button>
					<button disabled={!canSave} type="submit" className={`${style.actionButton} ${!canSave && style.disabled}`} style={{ backgroundColor: "#4973ff" }}>Guardar</button>
				</div>
			</form>
		</div>
	</div>
}