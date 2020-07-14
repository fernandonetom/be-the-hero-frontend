import React, { useState, useEffect } from "react";
import "./styles.css";
import { Link, useHistory } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import Validation from "../../services/validation";
import api from "../../services/api";
import toast from "../../services/toast";
import currencyFormatter from "../../common/functions/currencyFormatter";

import logoImg from "../../assets/logo.png";
export default function NewIncident() {
	const [fileMsg, setFileMsg] = useState("Imagem de perfil");
	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");
	const [value, setValue] = useState("");
	const [file, setFile] = useState("");
	const [buttonSubmit, setButtonSubmit] = useState(true);
	const history = useHistory();

	const ongId = localStorage.getItem("ongId");

	useEffect(() => {
		if (!Validation.isLogged()) return history.replace("/");
	}, [history, ongId]);
	const handleFile = (e) => {
		setFileMsg("Selecionado");
		setFile(e.target.files[0]);
	};
	async function handleRegister(e) {
		e.preventDefault();
		setButtonSubmit(false);
		const formData = new FormData();
		formData.append("title", title);
		formData.append("description", description);
		formData.append("value", value);
		formData.append("image", file);

		if (title === "" || description === "" || value === "" || file === "") {
			setButtonSubmit(true);
			return toast.Notify(`Preencha todos os campos`, "error");
		} else {
			const allowedExtensions = ["jpg", "png", "jpeg", "gif"];
			const fileName = file.name.split(".").pop();
			if (!allowedExtensions.includes(fileName)) {
				setButtonSubmit(true);
				return toast.Notify("Arquivo não permitido", "error");
			}
		}
		try {
			await api.post("incidents", formData, {
				headers: {
					Authorization: ongId,
				},
			});
			toast.Notify(`Cadastrado com sucesso`, "success");

			setTimeout(() => {
				history.push("/profile");
			}, 4000);
		} catch (err) {
			setButtonSubmit(true);
			toast.Notify(`Tente novamente mais tarde ${err.message}`, "error");
		}
	}
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
				<form onSubmit={handleRegister}>
					<input
						type="text"
						placeholder="Título do caso"
						autoComplete="ffds"
						value={title}
						onChange={(e) => setTitle(e.target.value)}
					/>
					<textarea
						placeholder="Descrição"
						autoComplete="ffds"
						value={description}
						onChange={(e) => setDescription(e.target.value)}
					/>
					<input
						type="phone"
						placeholder="Valor em reais"
						autoComplete="ffds"
						value={value}
						onChange={(e) => setValue(currencyFormatter(e.target.value))}
					/>
					<input
						id="file"
						className="inputfile"
						type="file"
						onChange={(e) => handleFile(e)}
					/>
					<label htmlFor="file">{fileMsg}</label>
					{buttonSubmit && (
						<button type="submit" className="button">
							Cadastrar
						</button>
					)}
				</form>
			</div>
			<toast.ContainerNotify />
		</div>
	);
}
