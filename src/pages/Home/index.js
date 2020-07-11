import React, { useState, useEffect } from "react";
import "./styles.css";
import { Link } from "react-router-dom";
import {
	FiLogIn,
	FiMail,
	FiPhoneCall,
	FiXSquare,
	FiPlus,
} from "react-icons/fi";

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
	const [page, setPage] = useState(1);
	const [totalPages, setTotalPages] = useState(0);
	const [loadedAll, setLoadedAll] = useState(false);

	useEffect(() => {
		getIncidents();
	}, []);

	function getIncidents(page = 1) {
		trackPromise(
			api
				.get(`incidents?page=${page}`)
				.then((response) => {
					setLoaded(true);
					if (response.data.message) {
						toast.Notify(response.data.message, "error");
						return;
					}
					setIncidents([...incidents, ...response.data]);
					setTotalPages(Math.ceil(response.headers["x-total-count"] / 6));
				})
				.catch((err) => {
					toast.Notify("Tente novamente mais tarde", "error");
				})
		);
	}

	function loadMore() {
		if (page < totalPages) {
			console.log("foi");
			getIncidents(page + 1);
			if (page + 1 === totalPages) {
				setLoadedAll(true);
				toast.Notify("Já mostramos todos os casos :)", "success");
			}
			setPage(page + 1);
		}
	}

	function handleInfo(index) {
		trackPromise(
			api
				.get(`ongs/${incidents[index].ong_id}`)
				.then((response) => {
					setPopupData(response.data);
					setPopup(true);
				})
				.catch((err) => {
					toast.Notify("Tente novamente mais tarde", "error");
				})
		);
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
											process.env.REACT_APP_GCLOUD_URL +
											incident.image +
											"?alt=media"
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
			{loaded && incidents.length === 0 && (
				<h1>Não encontramos nenhum caso cadastrado :(</h1>
			)}
			{!loadedAll && loaded && incidents.length !== 0 && totalPages !== 1 && (
				<button className="load-more" onClick={loadMore}>
					<FiPlus size={20} />
					mostrar mais
				</button>
			)}
			{popup && (
				<div id="popupBody" className="popupInfo">
					<div className="body">
						<div className="header">
							<div className="image">
								<img
									src={
										process.env.REACT_APP_GCLOUD_URL +
										popupData.image +
										"?alt=media"
									}
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
