import React, { useState } from "react";
import "./styles.css";
import { Link } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";

import api from "../../services/api";
import toast from "../../services/toast";

import { ToastContainer } from "react-toastify";

import logoImg from "../../assets/logo.png";
export default function Register() {
	const [fileMsg, setFileMsg] = useState("Imagem de perfil");
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [whatsapp, setWhats] = useState("");
	const [city, setCity] = useState("");
	const [uf, setUf] = useState("");
	const [file, setFile] = useState("");

	async function handleRegister(e) {
		e.preventDefault();
		const formData = new FormData();
		formData.append("name", name);
		formData.append("email", email);
		formData.append("whatsapp", whatsapp);
		formData.append("city", city);
		formData.append("uf", uf);
		formData.append("image", file);

		try {
			const response = await api.post("ongss", formData);
			toast.Notify(`Seu ID de acesso: ${response.data.id}`, "success", false);
		} catch (err) {
			toast.Notify(`Tente novamente mais tarde`, "error");
		}
	}
	const handleFile = (e) => {
		//const fileName = e.target.value.split("\\").pop();
		setFile(e.target.files[0]);
		setFileMsg("Selecionado");
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
				<form autoComplete="off" onSubmit={handleRegister}>
					<input
						type="text"
						placeholder="Nome da ONG"
						autocomplete="ffds"
						value={name}
						onChange={(e) => setName(e.target.value)}
					/>
					<input
						type="email"
						placeholder="Email"
						autocomplete="ffds"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					/>
					<input
						type="phone"
						placeholder="Whatsapp"
						autocomplete="ffds"
						value={whatsapp}
						onChange={(e) => setWhats(e.target.value)}
					/>
					<div className="input-group">
						<input
							type="text"
							placeholder="Cidade"
							autocomplete="ffds"
							value={city}
							onChange={(e) => setCity(e.target.value)}
						/>
						<input
							type="text"
							placeholder="UF"
							style={{ width: "80px" }}
							autocomplete="ffds"
							value={uf}
							onChange={(e) => setUf(e.target.value.toUpperCase())}
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
			<toast.ContainerNotify />
		</div>
	);
}
