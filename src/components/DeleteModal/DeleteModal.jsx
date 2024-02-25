import style from './DeleteModal.module.css'

export default function DeleteModal({ closeModal,handleDelete }) {
	return <div className={style.background}>
		<div className={style.modalContent}>
			<h3>¿Seguro que deseas eliminar este item?</h3>
			<div className={style.buttonContainer}>
				<button onClick={closeModal} className={style.listActionButton} style={{ backgroundColor: "#4973ff" }}>Cancelar</button>
				<button onClick={handleDelete} className={style.listActionButton} style={{ backgroundColor: "#ff2929" }}>Eliminar</button>
			</div>
		</div>
	</div>
}