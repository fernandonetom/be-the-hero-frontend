import React, { useState, useEffect } from "react";
import "./styles.css";
import { Link, useHistory } from "react-router-dom";
import { FiPower, FiTrash2 } from "react-icons/fi";

import Validation from "../../services/validation";
import api from "../../services/api";
import toast from "../../services/toast";

import { trackPromise } from "react-promise-tracker";
import Spinner from "../../common/spinner";

import logoImg from "../../assets/logo.png";

import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css";
export default function Profile() {
	const [incidents, setIncidents] = useState([]);
	const [loaded, setLoaded] = useState(false);

	const history = useHistory();
	const ongName = localStorage.getItem("ongName");
	const ongId = localStorage.getItem("ongId");
	const baseUrl =
		process.env.REACT_APP_ENV === "DEV"
			? process.env.REACT_APP_URL_LOCAL
			: process.env.REACT_APP_BASE_URL;
	useEffect(() => {
		if (!Validation.isLogged()) return history.replace("/");
		trackPromise(
			api
				.get("profile", {
					headers: {
						Authorization: ongId,
					},
				})
				.then((response) => {
					console.log(response.data);
					setIncidents(response.data);
					setLoaded(true);
				})
				.catch((err) => {
					toast.Notify("Tente novamente mais tarde", "error");
					setTimeout(() => history.replace("/"), 4000);
				})
		);
	}, [history, ongId]);

	function handleLogout() {
		localStorage.clear();
		history.push("/");
	}
	function handleDelete(id, index) {
		confirmAlert({
			customUI: ({ onClose }) => {
				return (
					<div className="custom-ui">
						<div className="body">
							<h1>Você tem certeza?</h1>
							<p>Você está prestes a excluir o caso {incidents[index].title}</p>
							<button onClick={onClose}>Cancelar</button>
							<button
								onClick={async () => {
									try {
										await api.delete(`incidents/${id}`, {
											headers: {
												Authorization: ongId,
											},
										});
										toast.Notify("Excluido com sucesso :)", "success");
										setIncidents(
											incidents.filter((incident) => incident.id !== id)
										);
									} catch (err) {
										toast.Notify("Ocorreu um erro", "error");
									}
									onClose();
								}}
							>
								Sim, tenho certeza!
							</button>
						</div>
					</div>
				);
			},
		});
	}
	return (
		<div className="profile-container">
			<header>
				<img src={logoImg} alt="Apoie uma ONG" />
				<span>Bem vinda, {ongName}</span>

				<Link className="button" to="/incidents/new">
					Cadastrar novo caso
				</Link>
				<button type="button" onClick={handleLogout}>
					<FiPower size={18} color="#e02041" />
				</button>
			</header>
			{incidents.length > 0 && (
				<>
					<h1>Seus casos cadastrados</h1>

					<ul>
						{incidents.map((incident, index) => (
							<li key={incident.id}>
								<div className="img-cover">
									<img
										src={
											baseUrl + "/public/uploads/incidents/" + incident.image
										}
										alt=""
									/>
								</div>
								<div className="item-body">
									<h3>{incident.title}</h3>

									<strong>DESCRIÇÃO</strong>
									<p>{incident.description}</p>

									<strong>VALOR:</strong>
									<p>
										{Intl.NumberFormat("pt-BR", {
											style: "currency",
											currency: "BRL",
										}).format(incident.value)}
									</p>

									<button
										type="button"
										title="Excluir caso"
										onClick={() => handleDelete(incident.id, index)}
									>
										<FiTrash2 size={20} color="#a8a8b3" />
									</button>
								</div>
							</li>
						))}
					</ul>
				</>
			)}
			<Spinner />
			{loaded && incidents.length === 0 && (
				<h1>Você ainda não cadastrou um caso</h1>
			)}
			<toast.ContainerNotify />
		</div>
	);
}
