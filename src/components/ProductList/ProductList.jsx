import useProducts from "../../hooks/useProducts"
import style from "./ProductList.module.css"
import ResponsiveTable from "../ResponsiveTable/ResponsiveTable";
import { useState } from "react";
import DeleteModal from "../DeleteModal/DeleteModal";
import { deleteProduct } from "../../lib/products";
import CreateProduct from "../CreateProduct/CreateProduct";

export default function ProductList({ tab,setTab }) {
	const { products,loading,refetch,refetchNoDesc,onSearch } = useProducts()

	const [searchValue,setSearchValue] = useState("")

	const [showDeleteModal,setShowDeleteModal] = useState(null)
	const [showCreateModal,setShowCreateModal] = useState(false)



	const handleSearch = (value) => {
		setSearchValue(value)
		onSearch(value)

	};

	const onDelete = (product) => {
		setShowDeleteModal(product)
	}

	const onCreate = () => {
		setShowCreateModal(true)
	}


	const onEdit = (product) => {
		setShowCreateModal(product)
	}

	const handleDelete = async () => {
		try {
			const response = await deleteProduct(showDeleteModal.id)

			if (response && response.data && response.data.error) throw new Error(response.data.message)

			setShowDeleteModal(null)
			alert("Elemento eliminado correctamente.")
		} catch (error) {
			console.log({ error: error.message })

			setShowDeleteModal(null)
			alert(error.message || "Error al eliminar el elemento.")
		}
		refetch()
	}
	const onCancel = () => {
		setShowDeleteModal(null)
		setShowCreateModal(null)
	}



	return <main className={style.mainContainer}>
		{!!showDeleteModal && <DeleteModal closeModal={onCancel} handleDelete={handleDelete} />}
		{!!showCreateModal && <CreateProduct existProduct={showCreateModal} closeModal={onCancel} refetch={refetch} />}
		<div className={style.buttonContainer}>
			<button style={{ backgroundColor: tab === "Productos" ? "#4d4dff" : "#6b6bff" }} onClick={() => setTab("Productos")} className={style.infoButton}>Productos</button>
			<button style={{ backgroundColor: tab === "Clientes" ? "#4d4dff" : "#6b6bff" }} onClick={() => setTab("Clientes")} className={style.infoButton}>Clientes</button>
			<button style={{ backgroundColor: tab === "Ventas" ? "#4d4dff" : "#6b6bff" }} onClick={() => setTab("Ventas")} className={style.infoButton}>Ventas</button>
		</div>

		<div className={style.listActions}>
			<input className={style.searchInput} value={searchValue} placeholder='Buscar...' onChange={(e) => handleSearch(e.target.value)} />
			<button style={{ fontSize: "10px" }} onClick={refetchNoDesc} className={style.createButton}>Prod. sin descripción</button>
			<button style={{ fontSize: "10px" }} onClick={refetch} className={style.createButton}>Todos los productos</button>
			<button onClick={onCreate} className={style.createButton}>Crear</button>
		</div>

		<ResponsiveTable
			loading={loading}
			elements={products}
			List={({ item }) => <li className={style.listItem}>
				<div className={style.listItemData}>
					<span className={style.listItemTitle}>{item.name}</span>
					<span>{`Precio: $${item.price}`}</span>
					<span>{`Cantidad: ${item.quantity}`}</span>
				</div>
				<div className={style.listItemActions}>
					<button
						onClick={() => onEdit(item)}
						className={style.listActionButton} style={{
							backgroundColor: "#ffa71a",

						}}>Editar</button>
					<button
						onClick={() => onDelete(item)}
						className={style.listActionButton}
						style={{ backgroundColor: "#ff2929" }}>Eliminar</button>
				</div>
			</li>}
			TableHead={["Nombre","Descripción","Precio","Cantidad","Acciones"]}
			TableRow={({ item }) =>
				<tr>
					<td>{item.name}</td>
					<td style={{ whiteSpace: 'pre-wrap',wordWrap: 'break-word' }}>{item.description || "-"}</td>
					<td>$ {item.price}</td>
					<td>{item.quantity}</td>
					<td style={{ textAlign: "right" }}>
						<div>

							<button onClick={() => onEdit(item)} className={style.listActionButton} style={{
								backgroundColor: "#ffa71a",
								marginRight: "1rem"

							}}>Editar</button>
							<button onClick={() => onDelete(item)}
								className={style.listActionButton}
								style={{ backgroundColor: "#ff2929" }}>Eliminar</button>
						</div>
					</td>
				</tr>
			}
		/>
	</main>

}