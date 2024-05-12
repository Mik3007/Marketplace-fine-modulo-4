const url = "https://striveschool-api.herokuapp.com/api/product/";
let idItem = new URLSearchParams(window.location.search).get("id");

// creo una funzione per creare un nuovo elemento, prendendo il valore inserito nel form dall'utente.

const createItem = async () => {
  const newItem = {
    name: document.querySelector(".name-item").value,
    brand: document.querySelector(".brand-item").value,
    price: document.querySelector(".price-item").value,
    imageUrl: document.querySelector(".img-item").value,
    description: document.querySelector(".description-item").value,
  };

  let response = await fetch(url, {
    method: "POST",
    headers: {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjNhNDgwNDBiM2IyNTAwMTUxYjU0NmMiLCJpYXQiOjE3MTUxODY5MDksImV4cCI6MTcxNjM5NjUwOX0.5Rv6MsFHbfrQhrO5aEI4c1yLYrk6VFHMDyoL42F0iG4",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newItem),
  });
  if (response.ok) {
    alert("new item insert");
  } else {
    throw new Error("Errore HTTP: " + response.status);
  }
};

// aggiungo un addEventlistener al bottone in modo che parta la funzione creata prima.

document.getElementById("button-submit").addEventListener("click", createItem);

// funzione per stampare in pagina i nuovi elementi creati

window.onload = async () => {
  const response = await fetch(url, {
    headers: {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjNhNDgwNDBiM2IyNTAwMTUxYjU0NmMiLCJpYXQiOjE3MTUxODY5MDksImV4cCI6MTcxNjM5NjUwOX0.5Rv6MsFHbfrQhrO5aEI4c1yLYrk6VFHMDyoL42F0iG4",
    },
  });
  const items = await response.json();
  let listItems = document.getElementById("list-items");

  // utilizzo map per ciclare gli elementi e stamparli in pagina, con innerHTML.

  items.forEach((item) => {
    listItems.innerHTML += `  
        <div class="card draggable col-12 col-sm-6 col-md-4 col-lg-3 mt-5" style="width: 18rem">
            <img src="${item.imageUrl}" class="card-img-top" alt="...">
        <div>
                <h5 class="card-title">${item.name}</h5>
                <p class="card-text">${item.brand}</p>
                <p class="card-text">${item.price} €</p> 
                <button onclick="editItem('${item._id}')" type="button" class="btn btn-primary mb-3">Edit</button>
                <button onclick="deleteItem('${item._id}')" type="button" class="btn btn-danger mb-3">Delete</button>
                <button onclick="updateItem('${item._id}')" type="button" class="btn btn-success mb-3">Save Changes</button>
        </div>
        </div>
        `;
  });
};

// Creo la funzione per modificare gli elementi

const editItem = async (id) => {
  if (id) {
    const response = await fetch(url + id, {
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjNhNDgwNDBiM2IyNTAwMTUxYjU0NmMiLCJpYXQiOjE3MTUxODY5MDksImV4cCI6MTcxNjM5NjUwOX0.5Rv6MsFHbfrQhrO5aEI4c1yLYrk6VFHMDyoL42F0iG4",
      },
    });
    const item = await response.json();

    // Assegna i valori dell'item agli input
    document.querySelector(".name-item").value = item.name;
    document.querySelector(".brand-item").value = item.brand;
    document.querySelector(".price-item").value = item.price;
    document.querySelector(".img-item").value = item.imageUrl;
    document.querySelector(".description-item").value = item.description;
  }
};

const updateItem = async (id) => {
  const name = document.querySelector(".name-item").value;
  const brand = document.querySelector(".brand-item").value;
  const price = document.querySelector(".price-item").value;
  const imageUrl = document.querySelector(".img-item").value;
  const description = document.querySelector(".description-item").value;

  const updatedItem = {
    name: name,
    brand: brand,
    price: price,
    imageUrl: imageUrl,
    description: description,
  };
  console.log(id);
  const response = await fetch(url + id, {
    method: "PUT",
    headers: {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjNhNDgwNDBiM2IyNTAwMTUxYjU0NmMiLCJpYXQiOjE3MTUxODY5MDksImV4cCI6MTcxNjM5NjUwOX0.5Rv6MsFHbfrQhrO5aEI4c1yLYrk6VFHMDyoL42F0iG4",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedItem),
  });

  if (response.ok) {
    alert("Save Changes");
    showItem();
    // Inserisco la funzione di js per ricaricare la pagina ogni volta
    window.location.reload();
  } else {
    throw new Error("Error: " + errore);
  }
};

// Creo la funzione per eliminare gli elementi

const deleteItem = async (id) => {
  const response = await fetch(url + id, {
    method: "DELETE",
    headers: {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjNhNDgwNDBiM2IyNTAwMTUxYjU0NmMiLCJpYXQiOjE3MTUxODY5MDksImV4cCI6MTcxNjM5NjUwOX0.5Rv6MsFHbfrQhrO5aEI4c1yLYrk6VFHMDyoL42F0iG4",
    },
  });

  if (response.ok) {
    alert("deleted item");
    // Inserisco la funzione di js per ricaricare la pagina ogni volta
    window.location.reload();
  } else {
    throw new Error("Error: " + errore);
  }
};
