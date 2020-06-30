import React, { useState } from "react";
import "./styles.css";
import { Link } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";

import logoImg from "../../assets/logo.png";
export default function NewIncident() {
	const [fileMsg, setFileMsg] = useState("Enviar uma imagem");

	const handleFile = (e) => {
		const fileName = e.target.value.split("\\").pop();
		setFileMsg(fileName + " selecionado");
	};

	return (
		<div className="new-incident">
			<div className="content">
				<section>
					<img src={logoImg} alt="Apoie uma ong" />
					<h1>Cadastrar novo caso</h1>
					<p>
						Decreva o caso detalhadamente para que as outras pessoas possam
						estar ajudando.
					</p>

					<Link className="back-link" to="/profile">
						<FiArrowLeft siz={16} color="#E02041" />
						Voltar para o perfil
					</Link>
				</section>
				<form autoComplete="off">
					<input type="text" placeholder="Título do caso" autocomplete="ffds" />
					<textarea placeholder="Descrição" autocomplete="ffds" />
					<input
						type="phone"
						placeholder="Valor em reais"
						autocomplete="ffds"
					/>
					<input
						id="file"
						className="inputfile"
						type="file"
						onChange={(e) => handleFile(e)}
					/>
					<label for="file">{fileMsg}</label>
					<button type="submit" className="button">
						Cadastrar
					</button>
				</form>
			</div>
		</div>
	);
}
