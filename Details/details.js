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
            <div class="card draggable col-sm-12 col-md-4 col-lg-3 cardItem" style="width: 18rem">
                <img src="${item.imageUrl}" class="card-img-top" alt="...">
            <div class="card-body">
                    <h5 class="card-title">${item.name}</h5>
                    <p class="card-text">${item.brand}</p>
                    <p class="card-text">${item.price} €</p> 
                    <p class="card-text">${item.description}</p>
                    <button type="button"><a href="/Backoffice/backoffice.html">Add to Cart</a></button>
                    <button type="button"><a href="/Home/index.html">home</a></button>
            </div>
            </div>
            `;
      };
}