import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { FiLogIn } from "react-icons/fi";
import "./styles.css";
import heroesImg from "../../assets/heroes.png";
import logoImg from "../../assets/logo.png";

import api from "../../services/api";
import toast from "../../services/toast";

export default function Logon() {
	const [id, setId] = useState("");
	const history = useHistory();

	async function handleLogin(e) {
		e.preventDefault();
		try {
			const response = await api.post("sessions", { id });
			if (response.data.message) {
				return toast.Notify(response.data.message, "error");
			} else {
				toast.Notify(response.data.name, "success");
				localStorage.setItem("ongId", id);
				localStorage.setItem("ongName", response.data.name);
				history.push("/profile");
			}
		} catch (err) {
			toast.Notify("Falha no login, tente novamente.", "error");
		}
	}
	return (
		<div className="logon-container">
			<section className="form">
				<img className="logo" src={logoImg} alt="Apoie uma ong" />
				<form onSubmit={handleLogin}>
					<h1>Faça seu login</h1>

					<input
						type="text"
						placeholder="Sua ID"
						onChange={(e) => setId(e.target.value)}
						value={id}
					/>
					<button className="button" type="submit">
						Entrar
					</button>

					<Link className="back-link" to="/register">
						<FiLogIn siz={16} color="#E02041" />
						Não tenho cadastro
					</Link>
				</form>
			</section>
			<img className="pessoas" src={heroesImg} alt="Heroes" />
			<toast.ContainerNotify />
		</div>
	);
}
