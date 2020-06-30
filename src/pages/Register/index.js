import React, { useState } from "react";
import "./styles.css";
import { Link } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";

import logoImg from "../../assets/logo.png";
export default function Register() {
	const [fileMsg, setFileMsg] = useState("Imagem de perfil");

	const handleFile = (e) => {
		const fileName = e.target.value.split("\\").pop();
		setFileMsg(fileName + " selecionado");
	};
	return (
		<div className="register-container">
			<div className="content">
				<section>
					<img src={logoImg} alt="Apoie uma ong" />
					<h1>Cadastro</h1>
					<p>
						Faça seu cadastro e ajude as pessoas a encontrarem os casos da sua
						ONG.
					</p>

					<Link className="back-link" to="/">
						<FiArrowLeft siz={16} color="#E02041" />
						Já tenho cadastro
					</Link>
				</section>
				<form autoComplete="off">
					<input type="text" placeholder="Nome da ONG" autocomplete="ffds" />
					<input type="email" placeholder="Email" autocomplete="ffds" />
					<input type="phone" placeholder="Whatsapp" autocomplete="ffds" />
					<div className="input-group">
						<input type="text" placeholder="Cidade" autocomplete="ffds" />
						<input
							type="text"
							placeholder="UF"
							style={{ width: "80px" }}
							autocomplete="ffds"
						/>
					</div>
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
