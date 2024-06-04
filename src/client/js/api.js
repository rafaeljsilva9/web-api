const API_HOST = "http://localhost:3000/api";

async function getMoviesApi() {
  const params = {
    order: "desc",
  };
  const queryString = new URLSearchParams(params).toString();
  const response = await fetch(`${API_HOST}/movies?${queryString}`);

  if (!response.ok) {
    const responseError = await response.json();
    throw new Error(responseError?.error);
  }

  return response.json();
}

async function addMovieApi({ name }) {
  const response = await fetch(`${API_HOST}/movies`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name }),
  });

  if (!response.ok) {
    const responseError = await response.json();
    throw new Error(responseError?.error);
  }

  return response.json();
}

async function updateMovieApi({ id, name }) {
  const response = await fetch(`${API_HOST}/movies/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name }),
  });

  if (!response.ok) {
    const responseError = await response.json();
    throw new Error(responseError?.error);
  }

  return response.json();
}

async function deleteMovieApi({ id }) {
  const response = await fetch(`${API_HOST}/movies/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    const responseError = await response.json();
    throw new Error(responseError?.error);
  }
}
