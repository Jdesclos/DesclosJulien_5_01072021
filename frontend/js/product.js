let params = (new URL(document.location)).searchParams;
let id = params.get("id");
let title = document.querySelector(`title`);
let accueil = document.querySelector('header a');
let contain_product = document.querySelector(".contain_product");
fetch(`http://localhost:3000/api/teddies/${id}`) //méthode fetch pour récupérer l'api mais de l'item qui nous interresse par l'id
.then(response => response.json()//conversion de la réponse en json
.then (data =>{
        let colors = ""
        data.colors.forEach(element => {//Pour  chaque élément de data.colors on ajoute :
        colors += `<option value="${element}">${element}</option>` 
        });
   contain_product.innerHTML += 
    `    
    <div class="card_product">
            <div class="card_product__img"><img src=${data.imageUrl} width="400px" height="266px"></div>
            <div class="card_product__caption">
                <h2>${data.name}</h2>
                <p> ${data.description}</p>
                <div id="option">
                        <select id="colors" name="couleur" form="colorform">
                                ${colors}
                        </select>
                        <input type="number" name="qty" value="1">
                </div>
            </div>           
                <div class="card_product__price">
                        <a href="#">
                                <i class="fas fa-shopping-cart"></i>
                                <p class="vide"></p>
                                <p>${data.price /100} €</p>
                                <p class="add_txt"> Ajouter au panier </p>
                        </a>
                </div>
    </div>
    <div class="success"></div>
    `;
    //titre onglet dynamique selon le produit
    title.innerText = `Oribear_${data.name}`;
    //bordure aux couleurs choisies pour l'ours
    let select = document.querySelector("#option select");
    let color = document.querySelector("#option select").options[select.selectedIndex].value;
        select.style.borderColor = color;
    select.addEventListener("change",(c)=>{
        let color = document.querySelector("#option select").options[select.selectedIndex].value;
        select.style.borderColor = color;
    })
//envoie de la quantité "on change" d'input
    let inputQty = document.querySelector("#option input");
    let qty = 1;
    inputQty.addEventListener("change",(event) => {
        qty = parseFloat(inputQty.value);
    })
    //ecoute d'evenment au clic qui stock dans une variable les infos produits
    let envoiePanier = document.querySelector(".card_product__price a");
    let ajout = document.querySelector(".success");
    envoiePanier.addEventListener("click", (e) => {
        e.preventDefault();
        let infoProduit = {
                nomProduit: data.name,
                idProduit: data._id,
                prixProduit: data.price /100,
                qtyProduit: qty,
                prixTotal: (data.price / 100) * qty,
        };
        //message de confirmation d'ajout au panier
        ajout.innerText = "Votre article a bien été ajouté au panier";
        setTimeout(()=>{ajout.innerText = ""},3000);
        //récupération et conversion en objet JS de la clé produit du local storage
        let produitEnregistre = JSON.parse(localStorage.getItem("produit"));
        //fonction pour ajouter les elements d'infoProduit dans le local storage
        const ajoutProduitLocalStorage = (() =>{               
                produitEnregistre.push(infoProduit);//push de la variable infoProduit dans le tableau produitEnregistre
                localStorage.setItem("produit",JSON.stringify(produitEnregistre));//conversion de l'objet javascript en string Json pour le local storage
        })
        //boucle pour lire tous les id et quantité présentes en local storage
        let localId = "";
        let localQty = infoProduit.qtyProduit;
        if (produitEnregistre){ //executer la boucle seulement si le tableau est different de null
                for (let i=0; i<produitEnregistre.length; i+=1){
                        if (produitEnregistre[i].idProduit == infoProduit.idProduit){
                        localId = produitEnregistre[i].idProduit;
                        localQty += produitEnregistre[i].qtyProduit;
                        produitEnregistre.splice(i,1)//supprime l'élément à l'index i si l'id qu'on envoie est déjà présente dans le localstorage
                        }
                }
        }
        //s'il y a un produit dans le localStorage dont l'id est déjà présente
        if(infoProduit.idProduit == localId){
                infoProduit.qtyProduit = localQty;
                ajoutProduitLocalStorage();

        }//s'il y a un produit dans le localStorage dont l'id n'est pas déjà présente
        else if (infoProduit.idProduit != localId && produitEnregistre){
                        ajoutProduitLocalStorage();
                }
        //s'il n'y a pas de produit dans le localStorage
        else {
                produitEnregistre =[];
                ajoutProduitLocalStorage();
}
})

})
.catch(error => {
        contain_product.innerHTML += `<p class="error">Nous somme désolé, le produit ne semble pas s'afficher, veuillez actualiser</p>`;
}))

accueil.innerHTML = `<a href="../../index.html"><h1>Oribear</h1></a>`;
