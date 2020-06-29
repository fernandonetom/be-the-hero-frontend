import React from "react";
import "./styles.css";
import { Link } from "react-router-dom";
import { FiPower, FiTrash2 } from "react-icons/fi";

import logoImg from "../../assets/logo.png";
export default function Profile() {
	return (
		<div className="profile-container">
			<header>
				<img src={logoImg} alt="Apoie uma ONG" />
				<span>Bem vinda, amigos de quatro patas</span>

				<Link className="button" to="/incidents/new">
					Cadastrar novo caso
				</Link>
				<button type="button">
					<FiPower size={18} color="#e02041" />
				</button>
			</header>
			<h1>Seus casos cadastrados</h1>

			<ul>
				<li>
					<div className="img-cover">
						<img src="http://lorempixel.com/500/200 " alt="" />
					</div>
					<div className="item-body">
						<h3>Cadela abandonada</h3>

						<strong>DESCRIÇÃO</strong>
						<p>
							Descrição teste Descrição teste Descrição teste Descrição teste
							Descrição teste Descrição teste Descrição teste
						</p>

						<strong>VALOR:</strong>
						<p>R$ 120,00</p>

						<button type="button" title="Excluir caso">
							<FiTrash2 size={20} color="#a8a8b3" />
						</button>
					</div>
				</li>

				<li>
					<div className="img-cover">
						<img src="http://lorempixel.com/500/200 " alt="" />
					</div>
					<div className="item-body">
						<h3>Cadela abandonada</h3>

						<strong>DESCRIÇÃO</strong>
						<p>
							Descrição teste Descrição teste Descrição teste Descrição teste
							Descrição teste Descrição teste Descrição teste
						</p>

						<strong>VALOR:</strong>
						<p>R$ 120,00</p>

						<button type="button" title="Excluir caso">
							<FiTrash2 size={20} color="#a8a8b3" />
						</button>
					</div>
				</li>

				<li>
					<div className="img-cover">
						<img src="http://lorempixel.com/500/200 " alt="" />
					</div>
					<div className="item-body">
						<h3>Cadela abandonada</h3>

						<strong>DESCRIÇÃO</strong>
						<p>
							Descrição teste Descrição teste Descrição teste Descrição teste
							Descrição teste Descrição teste Descrição teste
						</p>

						<strong>VALOR:</strong>
						<p>R$ 120,00</p>

						<button type="button" title="Excluir caso">
							<FiTrash2 size={20} color="#a8a8b3" />
						</button>
					</div>
				</li>

				<li>
					<div className="img-cover">
						<img src="http://lorempixel.com/500/200 " alt="" />
					</div>
					<div className="item-body">
						<h3>Cadela abandonada</h3>

						<strong>DESCRIÇÃO</strong>
						<p>
							Descrição teste Descrição teste Descrição teste Descrição teste
							Descrição teste Descrição teste Descrição teste
						</p>

						<strong>VALOR:</strong>
						<p>R$ 120,00</p>

						<button type="button" title="Excluir caso">
							<FiTrash2 size={20} color="#a8a8b3" />
						</button>
					</div>
				</li>
			</ul>
		</div>
	);
}
