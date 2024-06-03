document.addEventListener("DOMContentLoaded", function () {
  const movieList = document.getElementById("movie-list");
  document
    .getElementById("add-movie-btn")
    .addEventListener("click", addNewMovie);

  function loadMovies() {
    getMoviesApi()
      .then((data) => {
        movieList.innerHTML = "";
        document.getElementById("new-movie-name").value = "";
        data.forEach((movie) => {
          const li = document.createElement("li");
          const editInput = document.createElement("input");
          editInput.classList.add("edit-input");
          editInput.value = movie.name;

          const editButton = document.createElement("button");
          editButton.classList.add("edit-btn");
          editButton.innerText = "Editar";
          editButton.onclick = function () {
            editMovie(movie.id, editInput);
          };

          const deleteButton = document.createElement("button");
          deleteButton.innerText = "Remover";
          deleteButton.addEventListener("click", function () {
            deleteMovie(movie.id);
          });

          const buttonsDiv = document.createElement("div");
          buttonsDiv.className = "buttons-div";
          buttonsDiv.appendChild(editButton);
          buttonsDiv.appendChild(deleteButton);

          const contentDiv = document.createElement("div");
          contentDiv.className = "content-div";
          contentDiv.textContent = `${movie.name}`;
          contentDiv.appendChild(editInput);

          li.appendChild(contentDiv);
          li.appendChild(buttonsDiv);

          movieList.appendChild(li);
        });
      })
      .catch((error) => console.error("Erro ao carregar filmes:", error));
  }

  function addNewMovie() {
    const name = document.getElementById("new-movie-name").value;
    if (name) {
      addMovieApi({ name: name })
        .then(loadMovies)
        .catch((error) => console.error("Erro ao adicionar filme:", error));
    }
  }

  function editMovie(id, inputElement) {
    const newName = prompt("Digite o novo nome do filme:", inputElement.value);
    if (newName) {
      updateMovieApi({ id, name: newName })
        .then(loadMovies)
        .catch((error) => console.error("Erro ao editar filme:", error));
    }
  }

  function deleteMovie(id) {
    if (confirm("Tem certeza que deseja remover este filme?")) {
      deleteMovieApi({id})
        .then(loadMovies)
        .catch((error) => console.error("Erro ao remover filme:", error));
    }
  }

  loadMovies();
});
