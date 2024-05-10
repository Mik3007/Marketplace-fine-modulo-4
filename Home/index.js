const urlApi = "https://striveschool-api.herokuapp.com/api/product/";

//creo una funzione per stampare gli items creati.

window.onload = async () => {
  const response = await fetch(urlApi, {
    headers: {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjNhNDgwNDBiM2IyNTAwMTUxYjU0NmMiLCJpYXQiOjE3MTUxODY5MDksImV4cCI6MTcxNjM5NjUwOX0.5Rv6MsFHbfrQhrO5aEI4c1yLYrk6VFHMDyoL42F0iG4",
    },
  });
  const items = await response.json();
  let divItems = document.getElementById("container-items");

  // utilizzo map per ciclare gli elementi e stamparli in pagina, con innerHTML.

  items.map((item) => {
    divItems.innerHTML += `  
        <div class="card draggable" style="width: 18rem;">
            <img src="${item.imageUrl}" class="card-img-top" alt="...">
        <div class="card-body">
                <h5 class="card-title">${item.name}</h5>
                <p class="card-text">${item.brand}</p>
                <p class="card-text">${item.price} €</p> 
               <p> <button type="button" class="btn btn-primary">Details</button> 
               <button type="button" class="btn btn-primary"><a href=".." target="_blank"></a>Edit/Delete</button> </p>
        </div>
        </div>
        `;
  });
};
