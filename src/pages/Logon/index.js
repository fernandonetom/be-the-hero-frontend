import React from "react";
import { FiLogIn } from "react-icons/fi";
import "./styles.css";
import heroesImg from "../../assets/heroes.png";
import logoImg from "../../assets/logo.png";

export default function Logon() {
	return (
		<div className="logon-container">
			<section className="form">
				<img className="logo" src={logoImg} alt="Logo" />
				<form>
					<h1>Faça seu login</h1>

					<input type="text" placeholder="Sua ID" />
					<button className="button" type="submit">
						Entrar
					</button>

					<a href="/register">
						<FiLogIn siz={16} color="#E02041" />
						Não tenho cadastro
					</a>
				</form>
			</section>
			<img className="pessoas" src={heroesImg} alt="Heroes" />
		</div>
	);
}
