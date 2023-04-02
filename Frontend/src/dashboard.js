const baseUrl = "http://localhost:4500";
const name = document.getElementById("name");
const sendMailForm = document.getElementById("sendMailForm");
const logoutBtn = document.getElementById("logout");
// const inboxMsg = document.getElementById("inboxMsg");
let userDetails = null;
let flag = false;
// const inboxBtn = document.getElementById("inboxBtn");
window.addEventListener("load", () => {
	fetch(`${baseUrl}/user/`, {
		method: "GET",
		headers: {
			"content-type": "Application/JSON",
			Auth: localStorage.getItem("token"),
		},
	})
		.then((res) => res.json())
		.then((result) => {
			userDetails = {
				userId: result._id,
				email: result.email,
				age: result.age,
			};
			// localStorage.setItem("userDetails", JSON.stringify(userDetails));
			name.textContent = result.name;
		})
		.catch((err) => console.log(err.message));
});

name.addEventListener("click", () => {
	flag
		? ((logoutBtn.style.display = "block"), (flag = false))
		: ((logoutBtn.style.display = "none"), (flag = true));
});

logoutBtn.addEventListener("click", () => {
	alert("Sucessfully Logged Out");
	localStorage.clear();
});

sendMailForm.addEventListener("submit", (e) => {
	e.preventDefault();
	let newMail = {
		from: userDetails.email,
		to: sendMailForm[0].value,
		subject: sendMailForm[1].value,
		message: sendMailForm[2].value,
	};
	fetch(`${baseUrl}/email/sendMail`, {
		method: "POST",
		headers: {
			"content-type": "Application/JSON",
			Auth: localStorage.getItem("token"),
		},
		body: JSON.stringify(newMail),
	})
		.then((res) => res.json())
		.then((result) => alert(result.msg))
		.catch((err) => console.log(err.message));
	// console.log(newUser);
});
