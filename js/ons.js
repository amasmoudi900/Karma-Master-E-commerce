function signup ()
{
    var fName= document.getElementById('FirstName').value;
    var lname=document.getElementById('LastName').value;
    var fmail=document.getElementById('Email').value;
    var fpwd=document.getElementById('password').value;
    var fcpwd=document.getElementById('pwd').value;
    var ftel=document.getElementById('num').value; 


var verifName=verifLength(fName,3);
// verif first name
if (verifName)
        {document.getElementById('fNameError').innerHTML='VALID' ;
        document.getElementById('fNameError').style.color='green' ;  }
else 
{document.getElementById('fNameError').innerHTML='First Name INVALID' ; 
{document.getElementById('fNameError').style.color='red';  }
}
alert(verifName);

// verif LAST name
var test=verifLength(lname,5);
 
if (test) {
    document.getElementById('lNameError').innerHTML='VALID' ;
    document.getElementById('lNameError').style.color='green' ;  
}
          else 
          {document.getElementById('lNameError').innerHTML='LAST Name INVALID' ; 
          document.getElementById('lNameError').style.color='red';  
          }
alert(test);

//verif password
var testp=verifLength(fpwd,8);
 
if (testp)
{
    document.getElementById('pwdError').innerHTML='VALID' ;
    document.getElementById('pwdError').style.color='green' ;  
}
else 
{document.getElementById('pwdError').innerHTML='password INVALID' ; 
{document.getElementById('pwdError').style.color='red' ;  }
}
alert(testp);

// verif email


var testmail=verifemail(fmail);
 
if (testmail)
{
    document.getElementById('mailError').innerHTML='VALID' ;
    document.getElementById('mailError').style.color='green' ;  
}
else 
{document.getElementById('mailError').innerHTML='E-mail Adress INVALID' ; 
{document.getElementById('mailError').style.color='red' ;  }
}
alert( testmail);

// verif tel
var testphone=verifLengthnum(ftel,8);

if (testphone)
{
    document.getElementById('telError').innerHTML='VALID' ;
    document.getElementById('telError').style.color='green' ;  
}
else 
{document.getElementById('telError').innerHTML='Phone Number INVALID' ; 
{document.getElementById('telError').style.color='red' ;  }
}
alert( testphone);

//verif pwd
var confirmepass = document.getElementById('pwd').value;
    if (password = confirmepass) {
        document.getElementById('pwd').innerHTML = '';

    } 
    else 
    {
        document.getElementById('pwd').innerHTML = 'confirm password invalide';
        document.getElementById('pwd').style.color = 'red'
    }

//
       

// JSON : Java Script Object Notation

var user =
{
    FirstName:fName,
    LastName: lname,
    email:fmail,
    pwd: fpwd,
    tel: ftel

};
var users=JSON.parse(localStorage.getItem('myUsers')|| '[]');
users.push(user);
localStorage.setItem('myUsers',JSON.stringify(users));
}

function verifLength(chaine,nb)
{
   if (chaine.length>nb)
      { return true; }
    else 
    {
        return false;
    }
 
}

function verifLengthnum(chaine,nb)
{
   if (chaine.length==nb)
      { return true; }
    else 
    {
        return false;
    }
 
}
 function verifemail(adresse_email)
 {
    if (!adresse_email.match(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/)) {
        alert(adresse_email + " n'est pas une adresse valide");
    }
 }
// add product

 function add() {
    var name = document.getElementById('name').value;
    var category = document.getElementById('category').value;
    var price = document.getElementById('price').value;
    var stock = document.getElementById('stock').value;

    var verifname = verifLength(name, 5);
    if (verifname) {
        document.getElementById('name').innerHTML = '';

    } else {
        document.getElementById('name').innerHTML = 'name invalide';
        document.getElementById('name').style.color = 'red';

    }
    

    if (price > 0) {
        document.getElementById('price').innerHTML = '';

    } else {
        document.getElementById('price').innerHTML = 'price invalide';
        document.getElementById('price').style.color = 'red';

    }
    if (stock > 10) {
        document.getElementById('stock').innerHTML = '';

    } else {
        document.getElementById('stock').innerHTML = 'stock invalide';
        document.getElementById('stock').style.color = 'red';

    }
    var product =
    {
        name: name,
        category : category,
        price : price,
        stock : stock

    };
    var products = JSON.parse(localStorage.getItem("products") || "[]");
    products.push(product);
    localStorage.setItem('products', JSON.stringify(products));




}