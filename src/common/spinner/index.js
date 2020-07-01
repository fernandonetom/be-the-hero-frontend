import React from "react";
import { usePromiseTracker } from "react-promise-tracker";
import Loader from "react-loader-spinner";
import "./styles.css";

export default function Spinner(props) {
	const { promiseInProgress } = usePromiseTracker({ delay: 500 });

	return (
		promiseInProgress && (
			<div className="spinner">
				<Loader type="Hearts" color="#e02041" height="100" width="100" />
			</div>
		)
	);
}
