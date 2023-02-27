for(events of data.events){
  let currentDate = new Date(data.currentDate);
  let eventsDate = new Date(events.date);
  
  if (eventsDate < currentDate){
    let htmlEvents = `<div class="cards">
                        <div class="card" style="width: 20rem;">
                          <div class="cont-img-card">
                            <img src="${events.image}" alt="Cinema">
                          </div>
                          <div class="card-body">
                          <h5 class="card-title">${events.name}</h5>
                          <h6 class="card-title">${events.date}</h6>
                          <h6 class="card-title">${events.category}</h6>
                          <h6 class="card-title">${events.place}</h6>
                          <p class="card-text">${events.capacity}</p>
                          <p class="card-text">${events.assistance}</p>
                          <p class="card-text">${events.description}</p>
                          <div class="d-flex justify-content-between">
                            <p class="card-text">Price: $ ${events.price}</p>
                              <a href="#" class="btn btn-success">See more</a>
                            </div>
                          </div>
                        </div>
                      </div>`;
  document.querySelector("div.cards").innerHTML += htmlEvents;
    };
  };

  let card1 = document.getElementById("card1");
  card1.remove();