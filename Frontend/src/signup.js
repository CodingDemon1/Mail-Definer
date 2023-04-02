const signupWithEmail = document.getElementById("signupWithEmail");
const baseUrl = "http://localhost:4500";

signupWithEmail.addEventListener("submit", (e) => {
	e.preventDefault();
	if (signupWithEmail[3].value == signupWithEmail[4].value) {
		let newUser = {
			name: signupWithEmail[0].value,
			age: signupWithEmail[1].value,
			email: signupWithEmail[2].value,
			pass: signupWithEmail[3].value,
		};

		fetch(`${baseUrl}/user/register`, {
			method: "POST",
			headers: {
				"content-type": "Application/JSON",
			},
			body: JSON.stringify(newUser),
		})
			.then((res) => res.json())
			.then((result) => alert(result.msg))
			.catch((err) => console.log(err.message));
		// console.log(newUser);
	} else {
		console.log(signupWithEmail[3], signupWithEmail[4]);
		alert("Password Mismatch");
	}
});
