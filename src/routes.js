import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

//Pages
import Logon from "./pages/Logon";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import NewIncident from "./pages/NewIncident";
import Home from "./pages/Home";

export default function Routes() {
	return (
		<BrowserRouter>
			<Switch>
				<Route path="/" exact component={Home} />
				<Route path="/login" exact component={Logon} />
				<Route path="/register" component={Register} />
				<Route path="/profile" component={Profile} />
				<Route path="/incidents/new" component={NewIncident} />
			</Switch>
		</BrowserRouter>
	);
}
