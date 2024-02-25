import style from "./ClientList.module.css"
import ResponsiveTable from "../ResponsiveTable/ResponsiveTable";
import { useState } from "react";
import DeleteModal from "../DeleteModal/DeleteModal";
import useClients from "../../hooks/useClients";
import CreateClient from '../CreateClient/CreateClient';
import { deleteClient } from '../../lib/clients';

export default function ClientList({ tab,setTab }) {
	const { clients,loading,refetch,onSearch } = useClients()

	const [showDeleteModal,setShowDeleteModal] = useState(null)
	const [showCreateModal,setShowCreateModal] = useState(false)

	const [searchValue,setSearchValue] = useState("")

	const onDelete = (product) => {
		setShowDeleteModal(product)
	}

	const onCreate = () => {
		setShowCreateModal(true)
	}


	const onEdit = (product) => {
		setShowCreateModal(product)
	}

	const handleSearch = (value) => {
		setSearchValue(value)
		onSearch(value)
	}

	const handleDelete = async () => {
		try {
			await deleteClient(showDeleteModal.id)
			setShowDeleteModal(null)
			alert("Elemento eliminado correctamente.")
		} catch (error) {
			setShowDeleteModal(null)
			alert("Error al eliminar el elemento.")
		}
		refetch()
	}
	const onCancel = () => {
		setShowDeleteModal(null)
		setShowCreateModal(null)
	}



	return <main className={style.mainContainer}>
		{!!showCreateModal && <CreateClient existClient={showCreateModal} closeModal={onCancel} refetch={refetch} />}
		{!!showDeleteModal && <DeleteModal closeModal={onCancel} handleDelete={handleDelete} />}
		<div className={style.buttonContainer}>
			<button style={{ backgroundColor: tab === "Productos" ? "#4d4dff" : "#6b6bff" }} onClick={() => setTab("Productos")} className={style.infoButton}>Productos</button>
			<button style={{ backgroundColor: tab === "Clientes" ? "#4d4dff" : "#6b6bff" }} onClick={() => setTab("Clientes")} className={style.infoButton}>Clientes</button>
			<button style={{ backgroundColor: tab === "Ventas" ? "#4d4dff" : "#6b6bff" }} onClick={() => setTab("Ventas")} className={style.infoButton}>Ventas</button>
		</div>
		<div className={style.listActions}>
			<input className={style.searchInput} value={searchValue} placeholder='Buscar...' onChange={(e) => handleSearch(e.target.value)} />
			<button onClick={onCreate} className={style.createButton}>Crear</button>
		</div>

		<ResponsiveTable
			loading={loading}
			elements={clients}
			List={({ item }) => <li className={style.listItem}>
				<div className={style.listItemData}>
					<span className={style.listItemTitle}>{item.nombre}</span>
					<span>{`Email: ${item.email}`}</span>
					<span>{`Dirección: ${item.direccion}`}</span>
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
			TableHead={["Nombre","Email","Dirección","Acciones"]}
			TableRow={({ item }) =>
				<tr>
					<td>{item.nombre}</td>
					<td>{item.email}</td>
					<td>{item.direccion}</td>
					<td style={{ textAlign: "right" }}>
						<button onClick={() => onEdit(item)} className={style.listActionButton} style={{
							backgroundColor: "#ffa71a",
							marginRight: "1rem"

						}}>Editar</button>
						<button onClick={() => onDelete(item)}
							className={style.listActionButton}
							style={{ backgroundColor: "#ff2929" }}>Eliminar</button>
					</td>
				</tr>
			}
		/>

	</main>

}