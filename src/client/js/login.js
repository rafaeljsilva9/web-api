document.getElementById("login-btn").addEventListener("click", async () => {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  const errorMessage = document.getElementById("error-message");

  try {
    const response = await fetch(`${API_HOST}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    const data = await response.json();

    if (response.ok) {
      localStorage.setItem("token", data.token);
      window.location.href = "./movies";
    } else {
      errorMessage.textContent = data.message;
    }
  } catch (error) {
    errorMessage.textContent =
      "Erro ao realizar login. Tente novamente mais tarde.";
  }
});
