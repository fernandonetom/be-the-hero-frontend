const Validation = {
	isLogged: () => {
		const ongName = localStorage.getItem("ongName");
		const ongId = localStorage.getItem("ongId");
		if (
			ongName === "" ||
			ongName === null ||
			ongName === undefined ||
			ongId === "" ||
			ongId === null ||
			ongId === undefined
		) {
			return false;
		} else {
			return true;
		}
	},
};

export default Validation;
