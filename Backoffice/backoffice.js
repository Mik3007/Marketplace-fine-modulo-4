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

  // Invio i dati al server con il metodo POST, utilizzando l'url e l'autorizzazione

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

    // inserisco delle stringhe vuote come valore, in modo che se la risposta è ok, svuota i campi del form.

    document.querySelector(".name-item").value = "";
    document.querySelector(".brand-item").value = "";
    document.querySelector(".price-item").value = "";
    document.querySelector(".img-item").value = "";
    document.querySelector(".description-item").value = "";
    
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
  let listItems = document.getElementById("list-items"); // list-item lo utilizzo come contenitore per le card

  // utilizzo il foreach per ciclare gli elementi e stamparli in pagina, con innerHTML, creo già i 3 bottoni con l'onclick e la funzione inerente.

  items.forEach((item) => {
    listItems.innerHTML += `  
  <div class="container">
    <div class="row">
        <div class="col-12">
            <ul class="item-list">
                <li class="item">
                    <img class="img-list-backoffice" src="${item.imageUrl}" alt="logo">
                    <div class="item-details">
                        <span>${item.name}</span>
                        <span>${item.brand}</span>
                        <span class="price-item-backoffice">${item.price} €</span>
                    </div>
                    <div class="item-actions">
                        <button onclick="editItem('${item._id}')" type="button" class="btn btn-primary">Edit</button>
                        <button onclick="deleteItem('${item._id}')" type="button" class="btn btn-danger">Delete</button>
                        <button onclick="updateItem('${item._id}')" type="button" class="btn btn-success">Save Changes</button>
                    </div>
                </li>   
            </ul>
        </div>
    </div>
  </div>`;
  });
};

  // Creo la funzione per modificare gli elementi, prendendo l'id dell'elemento cliccato.

const editItem = async (id) => {
  if (id) {
    const response = await fetch(url + id, {
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjNhNDgwNDBiM2IyNTAwMTUxYjU0NmMiLCJpYXQiOjE3MTUxODY5MDksImV4cCI6MTcxNjM5NjUwOX0.5Rv6MsFHbfrQhrO5aEI4c1yLYrk6VFHMDyoL42F0iG4",
      },
    });
    const item = await response.json();

    // faccio in modo che al momento del click, si ripopoli il form con il valore assegnato dagli input in precedenza.

    document.querySelector(".name-item").value = item.name;
    document.querySelector(".brand-item").value = item.brand;
    document.querySelector(".price-item").value = item.price;
    document.querySelector(".img-item").value = item.imageUrl;
    document.querySelector(".description-item").value = item.description;
  }
};

    // Creo la funzione per modificare gli elementi, e inviarli al server con il metodo PUT

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

    // svuoto il form 

    document.querySelector(".name-item").value = "";
    document.querySelector(".brand-item").value = "";
    document.querySelector(".price-item").value = "";
    document.querySelector(".img-item").value = "";
    document.querySelector(".description-item").value = "";

    alert("Save Changes");

    // Inserisco la funzione di js per ricaricare la pagina ogni volta
    window.location.reload();
  } else {
    throw new Error("Error: " + errore);
  }
};

// Creo la funzione per eliminare gli elementi con il metodo DELETE

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
