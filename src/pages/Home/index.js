import React, { useState, useEffect } from "react";
import "./styles.css";
import { Link } from "react-router-dom";
import { FiLogIn, FiMail, FiPhoneCall, FiXSquare } from "react-icons/fi";

import { trackPromise } from "react-promise-tracker";
import Spinner from "../../common/spinner";
import { LazyLoadImage } from "react-lazy-load-image-component";

import api from "../../services/api";
import toast from "../../services/toast";

import logoImg from "../../assets/logo.png";

import ReactTooltip from "react-tooltip";

export default function Profile() {
	const [incidents, setIncidents] = useState([]);
	const [loaded, setLoaded] = useState(false);
	const [popup, setPopup] = useState(false);
	const [popupData, setPopupData] = useState([]);

	const baseUrl =
		process.env.REACT_APP_ENV === "DEV"
			? process.env.REACT_APP_URL_LOCAL
			: process.env.REACT_APP_BASE_URL;

	useEffect(() => {
		trackPromise(
			api
				.get("incidents")
				.then((response) => {
					setIncidents(response.data);
					setLoaded(true);
				})
				.catch((err) => {
					toast.Notify("Tente novamente mais tarde", "error");
				})
		);
	}, []);

	function handleInfo(index) {
		setPopupData(incidents[index]);
		setPopup(true);
	}

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
						{incidents.map((incident, index) => (
							<li
								className="item"
								key={incident.id}
								onClick={() => handleInfo(index)}
							>
								<div className="img-cover">
									<LazyLoadImage
										alt={incident.title}
										effect="blur"
										src={
											baseUrl + "/public/uploads/incidents/" + incident.image
										}
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
			{popup && (
				<div id="popupBody" className="popupInfo">
					<div className="body">
						<div className="header">
							<div className="image">
								<img
									src={baseUrl + "/public/uploads/incidents/" + popupData.image}
									alt=""
								/>
							</div>
							<div className="headerInfo">
								<h3>{popupData.name}</h3>
								<p>
									{popupData.city}-{popupData.uf}
								</p>
							</div>
						</div>
						<div className="section">
							<button
								className="close"
								onClick={() => {
									document
										.getElementById("popupBody")
										.classList.add("saida-popup");
									setTimeout(() => {
										setPopup(false);
									}, 500);
								}}
							>
								<FiXSquare size={25} color="#e02041" />
							</button>
							<h3>Informações de contato:</h3>
							<p>
								<FiMail size={18} color="#e02041" /> {popupData.email}
							</p>
							<p>
								<FiPhoneCall size={18} color="#128C7E" /> {popupData.whatsapp}
							</p>
							<div className="contato">
								<a href={"mailto:" + popupData.email} className="email">
									Email
								</a>
								<a
									href={"https://wa.me/55" + popupData.whatsapp}
									className="whatsapp"
								>
									Whatsapp
								</a>
							</div>
						</div>
					</div>
				</div>
			)}
			<Spinner />
			<ReactTooltip />
			<toast.ContainerNotify />
		</div>
	);
}
