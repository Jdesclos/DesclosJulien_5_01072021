let contain = document.querySelector(".contain");//Création d'un variable qui récupère la classe .contain
fetch('http://localhost:3000/api/teddies') //méthode fetch pour récupérer l'api
.then(response => response.json()//conversion en json de la réponse 
.then((data) => {
    //Création de contenu pour chaque élément du tableau de data
    data.forEach(element =>{        
        contain.innerHTML += 
        `
        <div class="card">
            <a href="frontend/pages/produit.html?id=${element._id}">
                <div class="card__img"><img src=${element.imageUrl} width="410px" height="265px"></div>
                <div class="card__caption">
                    <h2>${element.name}</h2>
                    <div class="desc_price">
                        <p> ${element.description}</p>
                        <span>${element.price /100} €</span>
                    </div>
                </div>
            </a>
        </div>
        `
    })
    }))
.catch(error => {
        contain.innerHTML += `<p class="error">Nous somme désolé, les produits ne semblent pas s'afficher, veuillez actualiser</p>`;
})
