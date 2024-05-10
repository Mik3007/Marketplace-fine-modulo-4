const url = "https://striveschool-api.herokuapp.com/api/product/"
let idItems = new URLSearchParams(window.location.search).get('id');

// creo una funzione per creare un nuovo elemento, prendendo il valore inserito nel form dall'utente.

const createItem = async (event) => {
    event.preventDefault();

    const newItem = {
        name: document.querySelector('.name-item').value,
        brand: document.querySelector('.brand-item').value,
        price: document.querySelector('.price-item').value,
        imageUrl: document.querySelector('.img-item').value,
        description: document.querySelector('.description-item').value,
    }

    let response = await fetch(url, {
        method:'POST',
        headers: {
        "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjNhNDgwNDBiM2IyNTAwMTUxYjU0NmMiLCJpYXQiOjE3MTUxODY5MDksImV4cCI6MTcxNjM5NjUwOX0.5Rv6MsFHbfrQhrO5aEI4c1yLYrk6VFHMDyoL42F0iG4",
        "Content-Type": "application/json"
        },
        body:JSON.stringify(newItem)
    })
    if(response.ok) {
        alert('new item insert');
    } else {
        throw new Error('Errore HTTP: ' + response.status);
    }
}

// aggiungo un addEventlistener al bottone in modo che parta la funzione creata prima.

document.getElementById('button-submit').addEventListener('click', createItem);

// funzione per stampare in pagina i nuovi elementi creati

window.onload = async() => {
    const response = await fetch(url, {
        headers: {
        "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjNhNDgwNDBiM2IyNTAwMTUxYjU0NmMiLCJpYXQiOjE3MTUxODY5MDksImV4cCI6MTcxNjM5NjUwOX0.5Rv6MsFHbfrQhrO5aEI4c1yLYrk6VFHMDyoL42F0iG4"
        }    
    });
    const items = await response.json();
    let listItems = document.getElementById('list-items');

    // utilizzo map per ciclare gli elementi e stamparli in pagina, con innerHTML.

    items.forEach((item) => {
        listItems.innerHTML += `  
        <div class="card draggable col-sm-12 col-md-4 col-lg-3" style="width: 18rem;">
            <img src="${item.imageUrl}" class="card-img-top" alt="...">
        <div class="card-body">
                <h5 class="card-title">${item.name}</h5>
                <p class="card-text">${item.brand}</p>
                <p class="card-text">${item.price} €</p> 
               <p> <button onclick="editItem('${item._id} type="button" class="btn btn-primary">Edit</button> 
               <button onclick="deleteItem('${item._id} type="button" class="btn btn-primary">Delete</button> </p>
        </div>
        </div>
        `;
    })
}

// creo la funzione per modificare gli elementi 

const editItem = async () => {
    let response = await fetch(url + id, {
        method:'PUT',
        headers: {
        "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjNhNDgwNDBiM2IyNTAwMTUxYjU0NmMiLCJpYXQiOjE3MTUxODY5MDksImV4cCI6MTcxNjM5NjUwOX0.5Rv6MsFHbfrQhrO5aEI4c1yLYrk6VFHMDyoL42F0iG4",
        "Content-Type": "application/json"
        },
        body:JSON.stringify(editItem)
    })
    if(response.ok) {
        alert('edit item');
    } else {
        throw new Error('Errore HTTP: ' + response.status);
    }
}

// creo la funzione per eliminare gli elementi

const deleteItem = async () => {
    let response = await fetch(url + id, {
        method: 'DELETE',
        headers: {
            "Authorization": "Bearer Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjNhNDgwNDBiM2IyNTAwMTUxYjU0NmMiLCJpYXQiOjE3MTUxODY5MDksImV4cCI6MTcxNjM5NjUwOX0.5Rv6MsFHbfrQhrO5aEI4c1yLYrk6VFHMDyoL42F0iG4"
        }
    });

    if (response.ok) {
        alert('Item deleted');
    }
}