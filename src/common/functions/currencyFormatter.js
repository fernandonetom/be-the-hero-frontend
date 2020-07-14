const currencyFormatter = (number) => {
	let newNumber = number;
	newNumber = newNumber.replace(/\D/g, "");
	newNumber = newNumber.replace(/(\d)(\d{2})$/, "$1,$2");
	newNumber = newNumber.replace(/(?=(\d{3})+(\D))\B/g, ".");
	return newNumber;
};
export default currencyFormatter;
