let urlAPI = "https://mindhub-xj03.onrender.com/api/amazing";

async function getDataEvents() {
  try{
    let response = await fetch(urlAPI);
    let data = await response.json();
    console.log(data.events)

    renderCards(data.events)

    // checkbox

        let categories = [];
    data.events.forEach(events => {
      if (!categories.includes(events.category)){
        categories.push(events.category);
      }
    });

    categories.forEach(category => {
      let htmlCategories = `<div class="form-check form-check-inline">
                            <input class="form-check-input" type="checkbox" id="inlineCheckbox1" value="${category}">
                            <label class="form-check-label" for="inlineCheckbox1">${category}</label>
                          </div>`;
      document.querySelector("div.form-check").innerHTML += htmlCategories;
    }
    );

    let caja = document.querySelector(".caja");
    caja.addEventListener("click", e =>{
      let category = [e.target.value];
      htmlCard = "";
      category.forEach(category => {
        data.events.filter(events => events.category == category).forEach(events => htmlCard += cards(events));
      });
      document.querySelector("div.cards").innerHTML = htmlCard;
    });

    // search

    let form = document.querySelector("form");
    form.addEventListener("submit", e =>{
      e.preventDefault();
    });

    let inputSearch = document.querySelector("#inputSearch");
    let button = document.querySelector("#button");
    let card1 = document.querySelector("div.cards");


    let filter = ()=>{
      document.querySelector("div.cards").innerHTML = "";
      let texto = inputSearch.value.toLowerCase();
      for (events of data.events){
        let name = events.name.toLowerCase();
        if(name.indexOf(texto) !== -1){
          document.querySelector("div.cards").innerHTML += cards(events);
        }
      }
      if (document.querySelector("div.cards").innerHTML === ""){
        document.querySelector("div.cards").innerHTML += `<div class="container-flui d-flex"><h2 class="d-flex">No hubo coincidencias</h2></div>`;
      }
    }

    button.addEventListener("click", filter);

  } catch (error) {
    console.log(error.mesage)
  }
};

getDataEvents();



// Cards

function cards(element){
  return `<div class="cards">
            <div class="card" id="card1" style="width: 20rem;">
              <div class="cont-img-card">
                <img src="${element.image}" alt="${element.name}">
              </div>
              <div class="card-body">
                <h5 class="card-title">${element.name}</h5>
                <h6 class="card-title">${element.date}</h6>
                <h6 class="card-title">${element.category}</h6>
                <h6 class="card-title">${element.place}</h6>
                <p class="card-text">${element.capacity}</p>
                <p class="card-text">${element.assistance || element.estimate}</p>
                <p class="card-text">${element.description}</p>
                  <div class="d-flex justify-content-between">
                    <p class="card-text">Price: $ ${element.price}</p>
                    <a href="./detail.html?id=${element._id}" class="btn btn-success">See more</a>
                  </div>
              </div>
            </div>
          </div>`;
};

function renderCards(array) {
  return array.forEach(events =>{
        document.querySelector("div.cards").innerHTML += cards(events)
  })
}



