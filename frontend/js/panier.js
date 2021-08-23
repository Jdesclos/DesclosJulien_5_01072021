let accueil = document.querySelector('header a');
accueil.innerHTML = `<a href="../../index.html"><h1>Oribear</h1></a>`;
let resume = document.querySelector('#resume');
let panier = JSON.parse(localStorage.getItem('produit'));
let prixArticle = 0;
console.log(panier)
if (panier ==='{}' || panier === null){
    let tableauPanier = 
    `
    <tr>
        <p>Votre panier est vide !</p>
    </tr>
    `
    document.getElementById('tableau_Panier').innerHTML = tableauPanier;
}
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
    localStorage.setItem("produit", JSON.stringify(panier))
    location.reload()
};

