// Cards

function cards(element){
  return `<div class="cards">
            <div class="card" style="width: 20rem;">
              <div class="cont-img-card">
                <img src="${element.image}" alt="${element.name}">
              </div>
              <div class="card-body">
                <h5 class="card-title">${element.name}</h5>
                <h6 class="card-title">${element.date}</h6>
                <h6 class="card-title">${element.category}</h6>
                <h6 class="card-title">${element.place}</h6>
                <p class="card-text">${element.capacity}</p>
                <p class="card-text">${element.assistance}</p>
                <p class="card-text">${element.description}</p>
                <div class="d-flex justify-content-between">
                    <p class="card-text">Price: $ ${element.price}</p>
                    <a href="./detail.html?id=${element.id}" class="btn btn-success">See more</a>
                  </div>
              </div>
              </div>
            </div>`;
};


for(events of data.events){
  let currentDate = new Date(data.currentDate);
  let eventsDate = new Date(events.date);
    
  if (eventsDate > currentDate){
  document.querySelector("div.cards").innerHTML += cards(events);
  };
}; 

// Checkbox

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

let upEvents = [];
data.events.forEach(events =>{
  let currentDate = new Date(data.currentDate);
  let eventsDate = new Date(events.date);
  if (eventsDate > currentDate){
    upEvents.push(events)
  }
})


let caja = document.querySelector(".caja");
caja.addEventListener("click", e =>{
  let category = [e.target.value];
  htmlCard ="";
  category.forEach(category => {
  upEvents.filter(events => events.category == category).forEach(events => htmlCard += cards(events));
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
  for (events of upEvents){
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