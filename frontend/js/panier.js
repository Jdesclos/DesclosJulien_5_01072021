let accueil = document.querySelector('header a');
accueil.innerHTML = `<a href="../../index.html"><h1>Oribear</h1></a>`;
let resume = document.querySelector('#resume');
//récupération et conversion en objet JS de la clé produit du local storage
let panier = JSON.parse(localStorage.getItem('produit'));
let prixArticle = 0;
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
        <td style="display:none"><strong>ID</strong></td>
        <td><strong>QUANTITE</strong></td>
        <td><strong>PRIX</strong></td>
        <td align="right"><strong>Total</strong></td>
    </tr>
    `
    //boucle pour créer autant d'éléments qu'il y a de lignes dans le local storage
    for(produits in panier){
        tableauPanier +=
        `
        <tr>
            <td>${panier[produits].nomProduit}</td>
            <td id="productsId" style="display:none">${panier[produits].idProduit}</div></td>
            <td>${panier[produits].qtyProduit}</td>
            <td>${panier[produits].prixProduit}€</td>
            <td align="right">${panier[produits].prixTotal /100}€</td>
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
        <td id="priceTotal" colspan="5" align="right"><strong>${total} €</strong></td>
    </tr>
    `
    document.getElementById('tableau_panier').innerHTML = tableauPanier
}
//vérification du champ email
let email = document.querySelector('#email');
email.addEventListener('change',function (){
    validEmail(this);
});
const validEmail = function (inputEmail){
    //création regExp
    let emailRegExp = new RegExp(
        '/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/'
        );
    let testEmail = emailRegExp.test(inputEmail.value);
    let small = document.querySelector('fieldset small');
    if (!testEmail){
        small.innerHTML = 'Adresse mail invalide';
        setTimeout(()=>{small.innerText = ""},3000);
    }
};
//vérification du champ prénom
let firstName = document.querySelector('#firstName');
firstName.addEventListener('change',function (){
    validFirstName(this);
});
const validFirstName = function (inputFirstName){
    //création regExp
    let firstNameRegExp = new RegExp(
        '^[A-Z][a-z]*$'
        );
    let testFirstName= firstNameRegExp.test(inputFirstName.value);
    let small = document.querySelector('fieldset small');
    if (!testFirstName){
        small.innerHTML = 'Ecrivez votre prénom en respectant ce format "Prénom"';
        setTimeout(()=>{small.innerText = ""},3000);
    }
};
//vérification du champ nom
let lastName = document.querySelector('#lastName');
lastName.addEventListener('change',function (){
    validLastName(this);
});
const validLastName = function (inputLastName){
    //création regExp
    let lastNameRegExp = new RegExp(
        '^[A-Z][a-z]*$'
        );
    let testLastName= lastNameRegExp.test(inputLastName.value);
    let small = document.querySelector('fieldset small');
    if (!testLastName){
        small.innerHTML = 'Ecrivez votre Nom en respectant ce format "Nom"';
        setTimeout(()=>{small.innerText = ""},3000);
    }
};
//vérification du champ addresse
let address = document.querySelector('#address');
address.addEventListener('change',function (){
    validAdress(this);
});
const validAdress = function (inputAdress){
    //création regExp
    let AdressRegExp = new RegExp(
        '[a-zA-Z]{1,100}'
        );
    let testAddress = AdressRegExp.test(inputAdress.value);
    let small = document.querySelector('fieldset small');
    if (!testAddress){
        small.innerText = 'Adresse invalide';
        setTimeout(()=>{small.innerText = ""},3000);
    }
};
//vérification du champ ville
let city = document.querySelector('#city');
city.addEventListener('change',function (){
    validCity(this);
});
const validCity = function (inputCity){
    //création regExp
    let cityRegExp = new RegExp(
        '[a-zA-Z]{1,10}'
        );
    let testCity = cityRegExp.test(inputCity.value);
    let small = document.querySelector('fieldset small');
    if (!testCity){
        small.innerText = 'Ville invalide';
        setTimeout(()=>{small.innerText = ""},3000);
    }
};
//Fonction qui valide le formulaire et l'envoi, via la méthode POST, au serveur afin d'avoir une réponse
function valid(){

    if(document.forms['formCommand'] != "") {
      // les données sont ok, on peut envoyer le formulaire

      const contact = {
        firstName: document.getElementById("firstName").value,
        lastName: document.getElementById("lastName").value,
        address: document.getElementById("address").value,
        city: document.getElementById("city").value,
        email: document.getElementById("email").value
      };

      const products = [panier[produits].idProduit]
      // Met dans une variable les id 
        
      const command = {contact, products}
        
      const options = {
        method: "POST",
        body: JSON.stringify(command),
        headers: {
            "Content-Type" : "application/json"
        }
      }
      
      fetch('http://localhost:3000/api/teddies/order', options)
          .then(res => res.json())
          .then(res => { 
            if (res.orderId) {
              alert(`Votre commande numéro ${res.orderId} à bien été passée.`)
              localStorage.setItem("orderId", res.orderId)
              localStorage.setItem("firstName", res.contact.firstName)
              window.location = `/frontend/view/menu/confirmation.html`
            } else {
              alert(`Erreur de commande`)
            }
          });
    }

    else {
      // sinon on affiche un message
      alert("Veuilliez remplir le formulaire.");
    }

  }
let send = document.getElementById("validCommand");
send.addEventListener("click",(event) => {
    event.preventDefault;
    valid();
})