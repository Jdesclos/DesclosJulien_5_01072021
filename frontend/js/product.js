let params = (new URL(document.location)).searchParams;
let id = params.get("id");
let title = document.querySelector(`title`);
let accueil = document.querySelector('header a');
let contain_product = document.querySelector(".contain_product");
fetch(`http://localhost:3000/api/teddies/${id}`) //méthode fetch pour récupérer l'api mais de l'item qui nous interresse
.then(response => response.json()//conversion en json
.then (data =>{
        let colors = ""
        data.colors.forEach(element => {
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
    let select = document.querySelector("#option select");
    let color = document.querySelector("#option select").options[select.selectedIndex].value;
        select.style.borderColor = color;
    select.addEventListener("change",(c)=>{
        let color = document.querySelector("#option select").options[select.selectedIndex].value;
        select.style.borderColor = color;
    })

    let inputQty = document.querySelector("#option input");
    let qty = 1;
    inputQty.addEventListener("change",(event) => {
        qty = parseFloat(inputQty.value);
    })
    let envoiePanier = document.querySelector(".card_product__price a");
    let ajout = document.querySelector(".success");
    envoiePanier.addEventListener("click", (e) => {
        e.preventDefault();
        let prixTotal = data.price * qty;
        let infoProduit = {
                nomProduit: data.name,
                idProduit: data._id,
                prixProduit: data.price /100,
                qtyProduit: qty,
                prixTotal: prixTotal,
        };
        //message de confirmation d'ajout au panier
        ajout.innerText = "Votre article a bien été ajouté au panier";
        setTimeout(()=>{ajout.innerText = ""},3000);
        //ajout de l'item du localStorage "obj" dans une variable "produit"
        let produitEnregistre = JSON.parse(localStorage.getItem("produit"));
        //fonction pour ajouter les elements d'infoProduit dans le local storage
        const ajoutProduitLocalStorage = (() =>{               
                produitEnregistre.push(infoProduit);
                localStorage.setItem("produit",JSON.stringify(produitEnregistre));
        })
        const ajoutMemeProduitLocalStorage = (() =>{             
                
                
                qtyProduitLocal = qtyProduitLocal + infoProduit.qtyProduit
        })
        //s'il y a un produit dans le localStorage dont l'id est déjà présente
        if (produitEnregistre){
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
