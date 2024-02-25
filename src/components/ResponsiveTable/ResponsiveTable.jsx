import { useMediaQuery } from '@react-hook/media-query';
import style from "./ResponsiveTable.module.css"

export default function ResponsiveTable({ elements,List,TableHead,TableRow,loading }) {
	const isSmallScreen = useMediaQuery('(max-width: 576px)');



	return <section className={style.mainContainer}>

		{isSmallScreen
			? <div className={style.tableSm}>
				{loading
					? <div>CARGANDO</div>
					: <ul className={style.listContent}>
						{elements?.map((item) => <List key={item.id} item={item} />)}
					</ul>
				}
			</div>

			: <div className={style.tableContainer}>
				<table className={style.tableLg}>
					<thead >
						<tr>
							{TableHead?.map((th,i) => <th key={i} style={{ textAlign: th === "Acciones" && "right" }}>{th}</th>)}
						</tr>
					</thead>
					{loading
						? <div>CARGANDO</div>
						: <tbody>
							{elements?.map((item) => <TableRow key={item.id} item={item} />)}
						</tbody>
					}
				</table>
			</div>
		}

	</section>


}