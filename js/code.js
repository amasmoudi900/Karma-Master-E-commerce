// This function allows to calculate average
// Function Declaration
function moyenne(math, phy, info) {
    return (math*2 + phy*3 + info*4)/9 ;
}

// Call Function
var abderrahmenMoy = moyenne(12,16,19);
// alert(abderrahmenMoy);

function ttc(nb, price, tva) {
    return (nb*price)*(1+tva/100);
}

var facture = ttc(10, 15, 19);
// alert(facture);

var notes = [12, 15, 18, 19, 3];
// function declaration
function moyenneTableau(T) {
    var total = 0;
    for (let i = 0; i < T.length; i++) {
        total = total + T[i];
    }
    return (total/T.length);
}

var moyenneTab = moyenneTableau(notes);
// alert(moyenneTab);

function produit(T) {
    var pr = 1;
    for (let i = 0; i < T.length; i++) {
        pr = pr * T[i];        
    }
    return pr;
}

function verifMoyenneTableau(T) {
    if (moyenneTableau(T) < 10) {
        alert('Insuffisant');
    } else {
        alert('Suffisant');
    }
}
verifMoyenneTableau(notes);
// fonction qui permet d'afficher le plus grand element d'un tableau
// fonction qui permet de calculer la somme des elements négatifs d'un tableau
// fonction qui permet de renverser une chaine de caractères


function mention(math, phy, info) {
    var moy = moyenne(math, phy, info);
    if (moy <5) {
        alert('Trop faible');
    } else  if (moy <10 && moy >=5) {
        alert('Faible');
    } else if (moy <12 && moy >=10) {
        alert('Moyen');
    } else if (moy <15 && moy >=12) {
        alert('Assez Bien');
    } else if (moy <17 && moy >=15) {
        alert('Bien');
    } else  {
        alert('Tres bien');
    }
}

mention(13,16,19);

function maxTab(T) {
    var max= T[0];
    for (let i = 1; i < T.length; i++) {
        if (T[i]> max) {
            max = T[i]
        }        
    }
    return max;
}

function sommeNegative(T) {
    var s = 0;
    for (var i = 0; i < T.length; i++) {
        if (T[i]<0) {
            s = s+T[i];
        }        
    }
    return s;
}

function reverseString(ch) {
    var result = '';
    for (let i = 0; i < ch.length; i++) {
        result =  ch[i] + result;      
    }
    return result; 
}

function pairImpair(T) {
    var p=0;
    for (let i = 0; i < T.length; i++) {
        if (T[i]%2 === 0) {
            p = p+1;
        }        
    }
    alert('Le nombre des elements pairs : '+p);
    alert('Le nombre des elements impairs : '+(T.length-p));
}
pairImpair([2,16,17,3,18,6,1]);
pairImpair([2,14,-31,-14,69,11]);
pairImpair([2,16,17,3,18,6,1]);