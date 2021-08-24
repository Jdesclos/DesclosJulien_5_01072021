let accueil = document.querySelector('header a');
accueil.innerHTML = `<a href="../../index.html"><h1>Oribear</h1></a>`;
let resume = document.querySelector('#resume');
//récupération et conversion en objet JS de la clé produit du local storage
let panier = JSON.parse(localStorage.getItem('produit'));
let prixArticle = 0;
console.log(panier)
//si panier est vide
if (panier ==='{}' || panier === null){
    let tableauPanier = 
    `
    <tr>
        <p>Votre panier est vide !</p>
    </tr>
    `
    document.getElementById('tableau_Panier').innerHTML = tableauPanier;
}
// si il y a des produits dans le panier
else{
    tableauPanier =
    `
    <tr>
        <td><strong>NAME</strong></td>
        <td><strong>ID</strong></td>
        <td><strong>QUANTITE</strong></td>
        <td><strong>PRIX</strong></td>
    </tr>
    `
    //boucle pour créer autant d'éléments qu'il y a de lignes dans le local storage
    for(produits in panier){
        tableauPanier +=
        `
        <tr>
            <td>${panier[produits].nomProduit}</td>
            <td id="productsId">${panier[produits].idProduit}</div></td>
            <td>${panier[produits].qtyProduit}</td>
            <td>${panier[produits].prixTotal /100}€</td>
            <td><button onclick="deleteItem('${panier[produits].idProduit}')">&#x274C;</button></td>
            `
    }
    //calcul du total
    let  total = 0;
for (let n=0; n<panier.length; n++) {
    total += panier[n].prixTotal /100;
}
    tableauPanier += 
    `
    <tr>
        <td><strong>Total</strong></td>
        <td id="priceTotal"><strong>${total} €</strong></td>
    </tr>
    `
    document.getElementById('tableau_panier').innerHTML = tableauPanier
}
//Fonction qui supprime la ligne de produit lors du clique sur le bouton
function deleteItem(idToRemove){
    delete panier[idToRemove]
    localStorage.setItem("panier", JSON.stringify(panier))
    location.reload()
};

