let params = (new URL(document.location)).searchParams;
let id = params.get("id");
let title = document.querySelector(`title`);
let accueil = document.querySelector('header a');
let contain_product = document.querySelector(".contain_product");
fetch(`http://localhost:3000/api/teddies/${id}`) //méthode fetch pour récupérer l'api
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
        qty = inputQty.value;
    })
    let envoiePanier = document.querySelector(".card_product__price a");
    let ajout = document.querySelector(".success");
    envoiePanier.addEventListener("click", (e) => {
        e.preventDefault();
        let infoProduit = {
                nomProduit: data.name,
                idProduit: data._id,
                prixProduit: data.price /100,
                qtyProduit: qty,
        };
        ajout.innerText = "Votre article a bien été ajouté au panier";
        setTimeout(()=>{ajout.innerText = ""},3000);
        let produitEnregistre = JSON.parse(localStorage.getItem("produit"));
        const ajoutProduitLocalStorage = (() =>{
                if(infoProduit.idProduit == localStorage.idProduit) {
                        produitEnregistre.qtyProduit = localStorage.qtyProduit + infoProduit.qtyProduit
                }
                else{
                produitEnregistre.push(infoProduit);
                localStorage.setItem("produit",JSON.stringify(produitEnregistre));
        }})
        //s'il y a un produit dans le localStorage
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