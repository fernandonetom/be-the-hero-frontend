import React, { useState, useEffect } from "react";
import "./styles.css";
import { Link } from "react-router-dom";
import { FiLogIn } from "react-icons/fi";

import { trackPromise } from "react-promise-tracker";
import Spinner from "../../common/spinner";

import api from "../../services/api";
import toast from "../../services/toast";

import logoImg from "../../assets/logo.png";

import ReactTooltip from "react-tooltip";

export default function Profile() {
	const [incidents, setIncidents] = useState([]);
	const [loaded, setLoaded] = useState(false);
	const baseUrl =
		process.env.REACT_APP_ENV === "DEV"
			? process.env.REACT_APP_URL_LOCAL
			: process.env.REACT_APP_BASE_URL;

	useEffect(() => {
		trackPromise(
			api
				.get("incidents")
				.then((response) => {
					console.log(response.data);
					setIncidents(response.data);
					setLoaded(true);
				})
				.catch((err) => {
					toast.Notify("Tente novamente mais tarde", "error");
				})
		);
	}, []);

	return (
		<div className="home-container">
			<header>
				<img src={logoImg} alt="Apoie uma ONG" />
				<span>Bem vindo(a)!</span>

				<Link className="button" to="/register">
					Cadastrar ONG
				</Link>
				<Link clasName="login" to="/login" data-tip="Fazer login">
					<button type="button">
						<FiLogIn size={18} color="#e02041" />
					</button>
				</Link>
			</header>
			{incidents.length > 0 && (
				<>
					<h1>Casos cadastrados</h1>

					<ul>
						{incidents.map((incident) => (
							<li className="item" key={incident.id}>
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
								</div>
							</li>
						))}
					</ul>
				</>
			)}
			{loaded && incidents === 0 && (
				<h1>Não encontramos nenhum caso cadastrado :(</h1>
			)}
			<Spinner />
			<ReactTooltip />
			<toast.ContainerNotify />
		</div>
	);
}
