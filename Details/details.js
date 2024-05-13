// recupero l'id dell'elemento selezionato

let id = new URLSearchParams(window.location.search).get("id");
const url = "https://striveschool-api.herokuapp.com/api/product/"+ id;

window.onload = async () => {
  await detail();
}

// faccio una fetch per recuperare i dati, prendendo l'id, aggiungendo all'url "+id"

const detail = async () => {
    if(id){
    const response = await fetch(url, {
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjNhNDgwNDBiM2IyNTAwMTUxYjU0NmMiLCJpYXQiOjE3MTUxODY5MDksImV4cCI6MTcxNjM5NjUwOX0.5Rv6MsFHbfrQhrO5aEI4c1yLYrk6VFHMDyoL42F0iG4",
      },
    });
    const item = await response.json();
    
// stampo a video con innerHTML i dati della card che mi servono

    let detailItem = document.getElementById('detailCard');
    
        detailItem.innerHTML += `  
        <div class="card card-details mb-3">
        <div class="row g-0">
          <div class="col-md-4">
            <img src="${item.imageUrl}" class="img-fluid rounded-start" alt="...">
          </div>
          <div class="col-md-8">
            <div class="card-body">
              <h5 class="card-title">${item.name} ${item.brand}</h5>
              <p class="card-text-details">${item.description}</p>
              <p class="card-text"><small class="price-details">${item.price} € <a aria-current="page" href="/Home/index.html">Home</a></small></p>
            </div>
          </div>
        </div>
      </div>
            `;
      };
}

