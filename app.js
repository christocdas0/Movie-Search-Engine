let movieResult = document.getElementById("resultSection");
let input = document.getElementById("input");
let MovieSearchButton = document.getElementById("clickBtn");
let movieStatus = document.getElementById("notResultSection");

let cardDiv = document.createElement("div");

cardDiv.classList.add("cards");

MovieSearchButton.addEventListener("click", () => {
  creating();
  input.value = "";
  input.focus();
});
input.addEventListener("keyup", (e) => {
  if (e.keyCode === 13) {
    creating();
    input.value = "";
  }
});

function creating() {
  let xhr = new XMLHttpRequest();
  let movieName = input.value;
  let api = "https://www.omdbapi.com/?apikey=c951ff1&s=" + movieName;

  xhr.onreadystatechange = function () {
    movieResult.innerText = "";
    movieStatus.innerText = "";
    let h2 = document.createElement("h2");
    h2.innerText = " loading...";
    movieStatus.appendChild(h2);

    if (this.readyState == 4) {
      h2.innerText = " ";
      let result = JSON.parse(this.responseText);
      console.log(result);

      if (result.Response == "True") {
        let searchResult = result.Search;

        let movieSR = searchResult.map((item) => {
          return ` <div class="card">
          <img
            src=${item.Poster}
            alt=""
          />
          <div class="card-details">
            <div class="details">
            <h3> name: ${item.Title}</h3>
            <h4> year: ${item.Year}</h4>
            <h4>type: ${item.Type}</h4>
    </div>
            <div class="card-button">
              <button>book now</button>
            </div>
          </div>
        </div>
        
        `;
        });

        movieSR = movieSR.join("");
        cardDiv.innerHTML = movieSR;
        movieResult.appendChild(cardDiv);
      } else {
        let h1 = document.createElement("h1");
        h1.innerText = " 404 Movie Not Found";
        movieStatus.appendChild(h1);
      }
    }
  };
  xhr.open("GET", api, true);
  xhr.send();
}
