// Detail

const queryString = location.search

const params = new URLSearchParams(queryString)

const id = params.get("id")


function cardDetail(element) {
  return `<div class="col d-flex card-big">
            <div class="card-i">
              <img src="${element.image}" alt="${element.name}" class="img-card-big">
            </div>
            <div class="card-i">
              <h2 class="title">${element.name}</h2>
              <ul>
                <li>Category: ${element.category}</li>
                <li>Date: ${element.date}</li>
                <li>Place: ${element.place}</li>
                <li>Capacity: ${element.capacity}</li>
                <li>Assistance: ${element.assistance}</li>
                <li>Description: ${element.description}</li>
                <li>Price: $ ${element.price}</li>
              </ul>
            </div>
          </div>`;
};



for (events of data.events){
  if (events.id == id){
    document.querySelector("div.row").innerHTML += cardDetail(events);
  }
}
