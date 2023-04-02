const loginForm = document.getElementById("loginForm");
const baseUrl = "http://localhost:4500";

loginForm.addEventListener("submit", (e) => {
	e.preventDefault();
	let logUser = {
		email: loginForm[0].value,
		pass: loginForm[1].value,
	};

	fetch(`${baseUrl}/user/login`, {
		method: "POST",
		headers: {
			"content-type": "Application/JSON",
		},
		body: JSON.stringify(logUser),
	})
		.then((res) => res.json())
		.then((result) => {
			console.log(result);
			if (result.token != undefined) {
				// localStorage.clear();
				localStorage.setItem("token", result.token);
				alert(result.msg);
				window.location.href = "./dashboard.html";
			} else {
				alert(result.msg);
			}
		})
		.catch((err) => console.log(err.message));
});
