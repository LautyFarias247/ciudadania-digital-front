import style from "./SalesList.module.css"
import ResponsiveTable from "../ResponsiveTable/ResponsiveTable";
import { useState } from "react";
import DeleteModal from "../DeleteModal/DeleteModal";
import CreateSale from '../CreateSale/CreateSale';
import { deleteClient } from '../../lib/clients';
import useSales from "../../hooks/useSales";
import { useMediaQuery } from "@react-hook/media-query";

export default function SalesList({ tab,setTab }) {
	const isSmallScreen = useMediaQuery('(max-width: 576px)');

	const { sales,status,totalSales,loading,refetch } = useSales()

	const [showDeleteModal,setShowDeleteModal] = useState(null)
	const [showCreateModal,setShowCreateModal] = useState(false)

	const onCreate = () => {
		setShowCreateModal(true)
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
		{!!showCreateModal && <CreateSale existClient={showCreateModal} closeModal={onCancel} refetch={refetch} />}
		{!!showDeleteModal && <DeleteModal closeModal={onCancel} handleDelete={handleDelete} />}
		<div className={style.buttonContainer}>
			<button style={{ backgroundColor: tab === "Productos" ? "#4d4dff" : "#6b6bff" }} onClick={() => setTab("Productos")} className={style.infoButton}>Productos</button>
			<button style={{ backgroundColor: tab === "Clientes" ? "#4d4dff" : "#6b6bff" }} onClick={() => setTab("Clientes")} className={style.infoButton}>Clientes</button>
			<button style={{ backgroundColor: tab === "Ventas" ? "#4d4dff" : "#6b6bff" }} onClick={() => setTab("Ventas")} className={style.infoButton}>Ventas</button>
		</div>

		{
			isSmallScreen ?
				<div className={style.listActions}>
					<div>
						<h4>{"Mostrando ventas recientes (24hs)"}</h4>
						<div>
							<h4>Ventas totales: {totalSales}</h4>
							{status?.map((s,i) => {
								return <span key={i} style={{ textTransform: "capitalize",marginRight: "1rem" }}>{`${s.estado}: ${s.total}`}</span>
							})}
						</div>
					</div>
					<button style={{ position: "fixed",right: "1rem",bottom: 0 }} onClick={onCreate} className={style.createButton}>Crear</button>
				</div>
				:
				<div className={style.listActionsLg}>
					<h3 style={{ display: "inline" }}>{"Mostrando ventas recientes (24hs)"}</h3>
					<div>
						<span style={{ marginRight: "1rem" }}>Ventas totales: {totalSales}</span>
						{status?.map((s,i) => {
							return <span key={i} style={{ marginRight: "1rem" }}>{`${s.estado}: ${s.total}`}</span>
						})}
					</div>
					<button style={{ position: "absolute",right: 0 }} onClick={onCreate} className={style.createButton}>Crear</button>
				</div>
		}

		<ResponsiveTable
			loading={loading}
			elements={sales}
			List={({ item }) => <li className={style.listItem}>
				<div className={style.listItemData}>
					<span className={style.listItemTitle}>{`Cliente: ${item.client_name}`}</span>
					<span>{`Monto total: $${item.monto_total}`}</span>
					<span>{`Fecha: ${getDate(item.fecha)}`}</span>
					<span>{`Estado: ${item.estado}`}</span>
				</div>
			</li>}
			TableHead={["Cliente","Monto total","Fecha","Estado"]}
			TableRow={({ item }) =>
				<tr>
					<td>{item.client_name}</td>
					<td>{item.monto_total}</td>
					<td>{getDate(item.fecha)}</td>
					<td>{item.estado}</td>
				</tr>
			}
		/>

	</main >

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