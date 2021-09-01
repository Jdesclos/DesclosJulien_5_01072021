let accueil = document.querySelector('header a');
accueil.innerHTML = `<a href="../../index.html"><h1>Oribear</h1></a>`;
let lienPanier = document.querySelector('#panier');
let resume = document.querySelector('#resume');
let nombreArticle = 0;
//récupération et conversion en objet JS de la clé produit du local storage
let panier = JSON.parse(localStorage.getItem('produit'));
let prixArticle = 0;
//si panier est vide
if (panier === null || panier.length == 0){
    let tableauPanier = 
    `
    <tr>
        <p>Votre panier est vide, revenez une fois celui-ci rempli</p>
    </tr>
    `
    document.getElementById('tableau_panier').innerHTML = tableauPanier;
    nombreArticle =0;
    localStorage.setItem("nombreArticle", nombreArticle)

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
            <td><input type="number" name="quantite" value="${panier[produits].qtyProduit}"></td>
            <td>${panier[produits].prixProduit}€</td>
            <td align="right">${panier[produits].prixTotal}€</td>
            <td align="right"><button class="btn-supprimer"><i class="fas fa-times"></i></button></td></tr></>
            `
    }

    //calcul du total prix du panier
    let  total = 0;

for (let n=0; n<panier.length; n++) {
    total += panier[n].prixTotal;
    localStorage.setItem("total", total)
}
        //calcul du nombres d'articles
    
for (let a=0; a<panier.length; a++){
    if(panier.lenght == 0){
        nombreArticle = 0;
        localStorage.setItem("nombreArticle", nombreArticle)
    }
    else{
    nombreArticle += parseFloat(panier[a].qtyProduit);
    localStorage.setItem("nombreArticle", nombreArticle)
    }
}
//affichage du panier
let quantiteTotal = JSON.parse(localStorage.getItem('nombreArticle'));
    lienPanier.innerText += ` (${quantiteTotal})`;
    tableauPanier += 
    `
    <tr>
        <td id="priceTotal" colspan="4" align="right"><strong>${total} €</strong></td>
    </tr>
    `
    document.getElementById('tableau_panier').innerHTML = tableauPanier
}
let small = document.querySelector('fieldset small');
function vanish () {
    setTimeout(()=>{small.innerText = ""},3000);
}
//vérification du champ email
let email = document.querySelector('#email');
email.addEventListener('change',function (){
    validEmail(this);
});
const validEmail = function (inputEmail){
    //création regExp
    let emailRegExp = new RegExp(
        '[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$'
        );
    let testEmail = emailRegExp.test(inputEmail.value);
    if (!testEmail){
        small.innerHTML = 'Adresse mail invalide';
        vanish();
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
    if (!testFirstName){
        small.innerHTML = 'Ecrivez votre prénom en respectant ce format "Prénom"';
        vanish();
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
    if (!testLastName){
        small.innerHTML = 'Ecrivez votre Nom en respectant ce format "Nom"';
        vanish();
    }
};
//vérification du champ addresse
let address = document.querySelector('#address');
address.addEventListener('change',function (){
    validAddress(this);
});
const validAddress = function (inputAdress){
    //création regExp
    let AdressRegExp = new RegExp(
        '[a-zA-Z]{1,100}'
        );
    let testAddress = AdressRegExp.test(inputAdress.value);
    if (!testAddress){
        small.innerText = 'Adresse invalide';
        vanish();
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
    if (!testCity){
        small.innerText = 'Ville invalide';
        vanish();
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
          .then(res => res.json())//conversion en JSON
          .then(res => { 
            if (res.orderId) {
              alert(`Votre commande numéro ${res.orderId} à bien été passée.`)
              localStorage.setItem("orderId", res.orderId)
              localStorage.setItem("firstName", res.contact.firstName)
              window.location = `confirmation.html`
            } else {
                small.innerText = 'Formulaire de contact mal rampli ou panier vide';
                vanish();
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
    //méthode filter qui supprime l'élément lors du clic sur la croix
    let del = document.querySelectorAll(".btn-supprimer");
    for (let i = 0; i < del.length; i++) {
        del[i].addEventListener("click",(e) => {
            e.preventDefault();
            panier.splice(i, 1);
            localStorage.setItem("produit",JSON.stringify(panier));
            window.location.reload();//La méthode Location.reload() recharge la ressource depuis l'URL actuelle.
        })
    }
        //changer la quantité sur la page panier
        let input = document.querySelectorAll('input[type=number]')
        let nouvelleQuantite=1;
        for (let c=0; c<input.length;c++){
            input[c].addEventListener("change",(e)=>{
                nouvelleQuantite = input[c].value;
                let nouvellesinfos ={
                    nomProduit : panier[c].nomProduit,
                    idProduit : panier[c].idProduit,
                    prixProduit:panier[c].prixProduit,
                    qtyProduit : nouvelleQuantite,
                    prixTotal :(panier[c].prixProduit) * nouvelleQuantite,
                };
                if(nouvelleQuantite == 0){
                    panier.splice(c, 1);
                localStorage.setItem("produit",JSON.stringify(panier));
                window.location.reload();//La méthode Location.reload() recharge la ressource depuis l'URL actuelle.
                }
                else{
                    panier.splice(c,1);
                    panier.push(nouvellesinfos);
                    localStorage.setItem("produit",JSON.stringify(panier));
                    window.location.reload();//La méthode Location.reload() recharge la ressource depuis l'URL actuelle.
                }
           
            
            })
        }

        