const API_HOST = "http://localhost:3000/api";
/** Should be stored in a safe place */ 
const API_KEY = "110ec58a-a0f2-4ac4-8393-c866d813b8d1";

async function getMoviesApi() {
  const params = {
    order: "desc",
  };
  const queryString = new URLSearchParams(params).toString();
  const response = await fetch(`${API_HOST}/movies?${queryString}`, {
    headers: {
      "x-api-key": API_KEY,
    },
  });

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
      "x-api-key": API_KEY,
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
      "x-api-key": API_KEY,
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
    headers: {
      "x-api-key": API_KEY,
    },
  });

  if (!response.ok) {
    const responseError = await response.json();
    throw new Error(responseError?.error);
  }
}
