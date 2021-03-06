import React from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./toast.css";

const Notify = (message, status, autoClose = 4000) => {
	const toastConfig = {
		position: toast.POSITION.BOTTOM_CENTER,
		autoClose: autoClose,
	};
	switch (status) {
		case "success":
			toast.success(message, toastConfig);
			break;
		case "error":
			toast.error(message, toastConfig);
			break;
		default:
			toast(message, toastConfig);
	}
};
function ContainerNotify() {
	return <ToastContainer className="toast" />;
}
export default { Notify, ContainerNotify };
