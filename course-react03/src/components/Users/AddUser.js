import React, { useState, useRef } from "react";
import Wrapper from "../Helpers/Wrapper";
import Button from "../UI/Button";
import Card from "../UI/Card";
import ErrorModal from "../UI/ErrorModal";

import styles from "./AddUser.module.css";

const AddUser = (props) => {
	const nameInputRef = useRef();
	const ageInputRef = useRef();

	const [error, setError] = useState("");

	const addUserHandler = (event) => {
		event.preventDefault();
		const enteredName = nameInputRef.current.value;
		const enteredUserAge = ageInputRef.current.value;

		//validating input
		if (
			enteredName.trim().length === 0 ||
			enteredUserAge.trim().length === 0
		) {
			setError({
				title: "Invalid Input",
				message: "Please enter a valid name and age.",
			});
			return;
		}
		if (+enteredUserAge < 1) {
			setError({
				title: "Invalid age",
				message: "Please enter a valid age (> 0).",
			});
			return;
		}

		props.onAddUser(enteredName, enteredUserAge);
		//resetting with ref, rarely should be used due to manipulating DOM without react.
		nameInputRef.current.value = "";
		enteredUserAge.current.value = "";
	};

	const errorHandler = () => {
		setError(null);
	};

	return (
		<Wrapper>
			{error && (
				<ErrorModal
					title={error.title}
					message={error.message}
					onConfirm={errorHandler}
				/>
			)}

			<Card className={styles.input}>
				<form onSubmit={addUserHandler}>
					<label htmlFor="username">Username</label>
					<input id="username" type="text" ref={nameInputRef} />
					<label htmlFor="age">Age (Years)</label>
					<input id="age" type="number" ref={ageInputRef} />
					<Button type="submit">Add User</Button>
				</form>
			</Card>
		</Wrapper>
	);
};

export default AddUser;
