const whatsappFormatter = (number) => {
	let newNumber = number;
	newNumber = newNumber.replace(/\D/g, "");
	newNumber = newNumber.replace(/(\d{2})(\d)/, "($1) $2");
	newNumber = newNumber.replace(/(\d{5})(\d)/, "$1-$2");
	newNumber = newNumber.replace(/(-\d{4})\d+?$/, "$1");

	return newNumber;
};
export default whatsappFormatter;
