// This function allows to create user account
function signup() {
  var firstName = document.getElementById("firstName").value;
  var verifFirstName = verifLength(firstName, 5);
  if (verifFirstName) {
    document.getElementById("firstNameError").innerHTML = "";
  } else {
    document.getElementById("firstNameError").innerHTML =
      "First Name must have at least 5 characters";
    document.getElementById("firstNameError").style.color = "red";
  }
  var lastName = document.getElementById("lastName").value;
  var verifLastName = verifLength(lastName, 3);
  if (verifLastName) {
    document.getElementById("lastNameError").innerHTML = "";
  } else {
    document.getElementById("lastNameError").innerHTML =
      "Last Name must have at least 3 characters";
    document.getElementById("lastNameError").style.color = "red";
  }
  var email = document.getElementById("email").value;
  var verifEmail = validateEmail(email);
  if (verifEmail) {
    document.getElementById("emailError").innerHTML = "";
  } else {
    document.getElementById("emailError").innerHTML = "Format Invalid";
    document.getElementById("emailError").style.color = "red";
  }
  var pwd = document.getElementById("pwd").value;
  var verifPwd = verifLength(pwd, 8);
  if (verifPwd) {
    document.getElementById("pwdError").innerHTML = "";
  } else {
    document.getElementById("pwdError").innerHTML =
      "Password must have at least 8 characters";
    document.getElementById("pwdError").style.color = "red";
  }
  var confirmPwd = document.getElementById("confirmPwd").value;
  if (confirmPwd === pwd) {
    document.getElementById("confirmPwdError").innerHTML = "";
  } else {
    document.getElementById("confirmPwdError").innerHTML = "Password not match";
    document.getElementById("confirmPwdError").style.color = "red";
  }
  var tel = document.getElementById("tel").value;
  if (tel.length === 8) {
    document.getElementById("telError").innerHTML = "";
  } else {
    document.getElementById("telError").innerHTML =
      "Tel number must have 8 characters";
    document.getElementById("telError").style.color = "red";
  }
  if (
    verifFirstName &&
    verifLastName &&
    verifEmail &&
    verifPwd &&
    pwd === confirmPwd &&
    tel.length === 8
  ) {
    var idUser = JSON.parse(localStorage.getItem("idUser") || "10");

    var user = {
      id: idUser,
      firstName: firstName,
      lastName: lastName,
      email: email,
      pwd: pwd,
      confirmPwd: confirmPwd,
      tel: tel,
      role: "user",
    };
    var users = JSON.parse(localStorage.getItem("users") || "[]");
    users.push(user);
    localStorage.setItem("users", JSON.stringify(users));
    localStorage.setItem("idUser", idUser + 1);
    location.replace("index.html");
  }
}

function addProduct() {
  // Get value from input
  var productName = document.getElementById("productName").value;
  // verif if productname > 6
  var verifProductName = verifLength(productName, 6);
  // verif if product exists
  var verifIfPrExist = searchProduct(productName);
  if (verifIfPrExist) {
    document.getElementById("productNameExistError").innerHTML =
      "Product already exists";
    document.getElementById("productNameExistError").style.color = "red";
  } else {
    document.getElementById("productNameError").innerHTML = "";
  }
  if (verifProductName) {
    document.getElementById("productNameError").innerHTML = "";
  } else {
    document.getElementById("productNameError").innerHTML =
      "Product Name must have at least 6 characters";
    document.getElementById("productNameError").style.color = "red";
  }
  var price = document.getElementById("price").value;
  var verifPrice = price > 0;
  if (verifPrice) {
    document.getElementById("priceError").innerHTML = "";
  } else {
    document.getElementById("priceError").innerHTML =
      "Price must be greater then 0";
    document.getElementById("priceError").style.color = "red";
  }
  var stock = document.getElementById("stock").value;
  var verifStock = stock > 10;
  if (verifStock) {
    document.getElementById("stockError").innerHTML = "";
  } else {
    document.getElementById("stockError").innerHTML = "Invalid stock (>10)";
    document.getElementById("stockError").style.color = "red";
  }
  var category = document.getElementById("category").value;
  var verifCategory = category.length !== 0;
  if (verifCategory) {
    document.getElementById("categoryError").innerHTML = "";
  } else {
    document.getElementById("categoryError").innerHTML = "Invalid category";
    document.getElementById("categoryError").style.color = "red";
  }

  if (
    verifProductName &&
    verifPrice &&
    verifStock &&
    verifCategory &&
    !verifIfPrExist
  ) {
    var idProduct = JSON.parse(localStorage.getItem("idProduct") || "1");
    var product = {
      id: idProduct,
      productName: productName,
      price: price,
      stock: stock,
      category: category,
    };
    var products = JSON.parse(localStorage.getItem("products") || "[]");
    products.push(product);
    localStorage.setItem("products", JSON.stringify(products));
    localStorage.setItem("idProduct", idProduct + 1);
    // location.replace("admin.html");
  }
}

function login() {
  var email = document.getElementById("emailLogin").value;
  var pwd = document.getElementById("pwdLogin").value;
  var users = JSON.parse(localStorage.getItem("users"));
  var findedUser;
  for (let i = 0; i < users.length; i++) {
    if (users[i].email === email && users[i].pwd === pwd) {
      findedUser = users[i];
    }
  }
  if (findedUser.role === "admin") {
    localStorage.setItem("connectedUser", JSON.stringify(findedUser));
    location.replace("admin.html");
  } else {
    localStorage.setItem("connectedUser", JSON.stringify(findedUser));
    location.replace("index.html");
  }
}
function searchProduct(x) {
  var products = JSON.parse(localStorage.getItem("products") || "[]");
  var prExist = false;
  for (let i = 0; i < products.length; i++) {
    if (products[i].productName === x) {
      prExist = true;
    }
  }
  return prExist;
}

function validateEmail(email) {
  const regExp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return regExp.test(String(email).toLowerCase());
}
function verifLength(ch, nb) {
  return ch.length > nb;
}

// THis functions allows to display dynamically products from LS
function displayProducts() {
  var products = JSON.parse(localStorage.getItem("products"));

  var productTable = `
    <table class="table table-striped">

                                        <tr>
										<th>I (position)</th>
										<th>Name</th>
										<th>Price</th>
										<th>Stock</th>
										<th>Category</th>
										<th>Actions</th>
                  </tr>`;

  for (let i = 0; i < products.length; i++) {
    var productTable =
      productTable +
      `									
									<tr>
										<td>${i}</td>
										<td>${products[i].productName}</td>
										${experienceStyle(products[i].price)} ${products[i].price}</td>
										<td>${products[i].stock}</td>
										<td>${products[i].category}</td>
                    <td>
                      <button class="btn btn-success" onclick="displayProductDetails(${products[i].id})">Display</button>
											<button class="btn btn-info" onclick="editProduct(${products[i].id})">Edit</button>
                      <button class="btn btn-danger" onclick="deleteObject(${i}, 'products')">Delete</button>
										</td>
									</tr>
                                `;
  }
  var productTable = productTable + `</table>`;
  document.getElementById("prTable").innerHTML = productTable;
}

function displayUsers() {
  var users = JSON.parse(localStorage.getItem("users"));

  var userTable = `
      <table class="table table-striped">
  
                                          <tr>
                                          <th>First Name</th>
                                          <th>Last Name</th>
                                          <th>Email</th>
                                          <th>Tel</th>
                                          <th>Actions</th>
                                      </tr>`;
  for (let i = 0; i < users.length; i++) {
    var userTable =
      userTable +
      `									
                                      <tr>
                                          <td>${users[i].firstName}</td>
                                          <td>${users[i].lastName}</td>
                                          <td>${users[i].email}</td>
                                          <td>${users[i].tel}</td>
                                          <td>
                                              <button class="btn btn-info" onclick="displayUserDetails(${users[i].id})" >Display</button>
                                              <button class="btn btn-info" onclick="editUser(${users[i].id})" >Edit</button>
                                              <button class="btn btn-danger" onclick="deleteObject(${i}, 'users')">Delete</button>
                                          </td>
                                      </tr>
                                  `;
  }
  var userTable = userTable + `</table>`;
  document.getElementById("userTable").innerHTML = userTable;
}

function deleteObject(x, T) {
  var objects = JSON.parse(localStorage.getItem(T) || "[]");
  objects.splice(x, 1);
  localStorage.setItem(T, JSON.stringify(objects));
  location.reload();
}

function editProduct(x) {
  var pr = searchById(x, "products");
  var editForm = `
   
							<div class="col-md-12 form-group">
								<input type="text" class="form-control" id="editPrice" name="name" value=${pr.price} placeholder="Price" >
              </div>
              <span id='priceEditError'></span>
              <div class="col-md-12 form-group">
								<input type="text" class="form-control" id="editStock" name="name" value=${pr.stock} placeholder="Stock" >
              </div>
              <span id='stockEditError'></span>
							<div class="col-md-12 form-group">
								<button type="submit" value="submit" onclick="validateEdit(${pr.id})" class="primary-btn">Edit product</button>
                            </div>`;
  document.getElementById("editFormProduct").innerHTML = editForm;
}

function searchById(x, T) {
  var objects = JSON.parse(localStorage.getItem(T) || "[]");
  var obj;
  for (let i = 0; i < objects.length; i++) {
    if (objects[i].id === x) {
      obj = objects[i];
    }
  }
  return obj;
}

function validateEdit(id) {
  var newPrice = document.getElementById("editPrice").value;
  var verifPrice = newPrice > 0;
  if (verifPrice) {
    document.getElementById("priceEditError").innerHTML = "";
  } else {
    document.getElementById("priceEditError").innerHTML =
      "Price must be greater then 0";
    document.getElementById("priceEditError").style.color = "red";
  }
  var newStock = document.getElementById("editStock").value;

  var verifStock = newStock > 10;
  if (verifStock) {
    document.getElementById("stockEditError").innerHTML = "";
  } else {
    document.getElementById("stockEditError").innerHTML =
      "Stock must be greater then 10";
    document.getElementById("stockEditError").style.color = "red";
  }
  if (verifPrice && verifStock) {
    var products = JSON.parse(localStorage.getItem("products") || "[]");
    for (let i = 0; i < products.length; i++) {
      if (products[i].id === id) {
        products[i].price = newPrice;
        products[i].stock = newStock;
      }
    }
    localStorage.setItem("products", JSON.stringify(products));
    location.reload();
  }
}

function validateEditTakwa(id) {
  var newPrice = document.getElementById("editPrice").value;
  var newStock = document.getElementById("editStock").value;

  var products = JSON.parse(localStorage.getItem("products") || "[]");
  var product = searchById(id, "products");
  var newProduct = {
    id: product.id,
    productName: product.productName,
    price: newPrice,
    stock: newStock,
    category: product.category,
  };
  products.push(newProduct);
  var pos = searchObjectPosition(id, "products");
  products.splice(pos, 1);
  localStorage.setItem("products", JSON.stringify(products));
  location.reload();
}

function searchObjectPosition(id, T) {
  var objects = JSON.parse(localStorage.getItem(T) || "[]");
  var index;
  for (let i = 0; i < objects.length; i++) {
    if (objects[i].id === id) {
      index = i;
    }
  }
  return index;
}

function displayProductDetails(id) {
  localStorage.setItem("idPr", id);
  location.replace("display-product.html");
}

function displaySearchedProduct() {
  var idPr = localStorage.getItem("idPr");
  var searchedPr = searchById(Number(idPr), "products");
  document.getElementById("prName").innerHTML = searchedPr.productName;
  document.getElementById("prPrice").innerHTML = searchedPr.price;
  document.getElementById("prStock").innerHTML = searchedPr.stock;
}

function editUser(id) {
  var user = searchById(id, "users");
  var editForm = `
   
							<div class="col-md-12 form-group">
								<input type="password" class="form-control" id="editPwd" name="name" value=${user.pwd} placeholder="Price" >
              </div>
              <div class="col-md-12 form-group">
								<input type="password" class="form-control" id="editConfirmPwd" name="name" value=${user.confirmPwd} placeholder="Stock" >
              </div>
              <div class="col-md-12 form-group">
								<input type="text" class="form-control" id="editTel" name="name" value=${user.tel} placeholder="Stock" >
              </div>
							<div class="col-md-12 form-group">
								<button type="submit" value="submit" onclick="validateEditUser(${user.id})" class="primary-btn">Edit User</button>
                            </div>`;
  document.getElementById("editFormUser").innerHTML = editForm;
}

function validateEditUser(id) {
  var newPwd = document.getElementById("editPwd").value;
  var newConfirmPwd = document.getElementById("editConfirmPwd").value;
  var newTel = document.getElementById("editTel").value;

  var users = JSON.parse(localStorage.getItem("users") || "[]");
  for (let i = 0; i < users.length; i++) {
    if (users[i].id === id) {
      users[i].pwd = newPwd;
      users[i].confirmPwd = newConfirmPwd;
      users[i].tel = newTel;
    }
  }
  localStorage.setItem("users", JSON.stringify(users));
  location.reload();
}

function displayUserDetails(id) {
  localStorage.setItem("idUser", id);
  location.replace("display-user.html");
}

function displaySearchedUser() {
  var idUser = localStorage.getItem("idUser");
  var searchedUser = searchById(Number(idUser), "users");
  document.getElementById("userName").innerHTML =
    searchedUser.firstName + " " + searchedUser.lastName;
  document.getElementById("userTel").innerHTML = searchedUser.tel;
  document.getElementById("userEmail").innerHTML = searchedUser.email;
}

function insertAdmins() {
  var users = JSON.parse(localStorage.getItem("users") || "[]");
  var admin1 = {
    id: 1,
    firstName: "Abderrahmen",
    lastName: "Masmoudi",
    email: "admin1@admin.tn",
    pwd: "12345",
    role: "admin",
  };
  var admin2 = {
    id: 2,
    firstName: "Chams",
    lastName: "Hamza",
    email: "admin2@admin.tn",
    pwd: "12345",
    role: "admin",
  };
  var admin3 = {
    id: 3,
    firstName: "Taha",
    lastName: "Khniss",
    email: "admin3@admin.tn",
    pwd: "12345",
    role: "admin",
  };
  users.push(admin1);
  users.push(admin2);
  users.push(admin3);
  localStorage.setItem("users", JSON.stringify(users));
  localStorage.setItem("adminAdded", "true");
}

function setHeader() {
  var connectedUser = JSON.parse(localStorage.getItem("connectedUser"));
  if (connectedUser) {
    
    if (connectedUser.role === 'admin') {
      var header = `
      <li class="nav-item active"><a class="nav-link" href="index.html">Home</a></li>
      <li class="nav-item"><a class="nav-link" href="shop.html">Shop</a></li>
      <li class="nav-item"><a class="nav-link" href="contact.html">Contact</a></li>
      <li class="nav-item"><a class="nav-link" href="admin.html">Admin</a></li>
      <li class="nav-item"><a class="nav-link" onclick="logout()" >Logout</a></li>
      <li class="nav-item"><a class="nav-link" id="connectedUserName"></a></li>`;
      document.getElementById("headerId").innerHTML = header;
      document.getElementById("connectedUserName").innerHTML =
    connectedUser.firstName + " " + connectedUser.lastName;
    } else {
      var cartSearch = `
      <li class="nav-item" id=""><a href="cart.hy" class="cart"><span id="ordersNbrHTML" class="ti-bag"></span></a></li>
							<li class="nav-item">
								<button class="search"><span class="lnr lnr-magnifier" id="search"></span></button>
              </li>`;
      document.getElementById('cartSearchHTML').innerHTML = cartSearch;
      var header = `
      <li class="nav-item active"><a class="nav-link" href="index.html">Home</a></li>
      <li class="nav-item"><a class="nav-link" href="shop.html">Shop</a></li>
      <li class="nav-item"><a class="nav-link" href="contact.html">Contact</a></li>
      <li class="nav-item"><a class="nav-link" onclick="logout()" >Logout</a></li>
      <li class="nav-item"><a class="nav-link" id="connectedUserName"></a></li>`;
      document.getElementById("headerId").innerHTML = header;
      document.getElementById("connectedUserName").innerHTML =
    connectedUser.firstName + " " + connectedUser.lastName;
    }
 
  } else {
    var header = `
  <li class="nav-item active"><a class="nav-link" href="index.html">Home</a></li>
	<li class="nav-item"><a class="nav-link" href="shop.html">Shop</a></li>
	<li class="nav-item"><a class="nav-link" href="contact.html">Contact</a></li>
	<li class="nav-item"><a class="nav-link" href="login.html">Login</a></li>
  <li class="nav-item"><a class="nav-link" href="registration.html">Signup</a></li>`;
  document.getElementById("headerId").innerHTML = header;

  }
  

}

// THis functions allows to display dynamically products from LS
function displayShopProducts() {
  var products = JSON.parse(localStorage.getItem("products"));
  var productTable = ``;
  for (let i = 0; i < products.length; i++) {
    var productTable =
      productTable +
      `									
      <!-- single product -->
      <div class="col-lg-4 col-md-6">
          <div class="single-product">
              <img class="img-fluid" src="img/product/p1.jpg" alt="">
              <div class="product-details">
                  <h6>${products[i].productName}</h6>
                  <div class="price">
                      <h6>${products[i].price}</h6>
                      <h6 class="l-through">${products[i].stock}</h6>
                  </div>

              </div>
              <button class="primary-btn" onclick="goToReservation(${products[i].id})" style="border-radius: 0px; width: 100%; ">Reserve</button>
          </div>
      </div>
                                `;
  }
  document.getElementById("shop").innerHTML = productTable;
}

function goToReservation(id) {
  localStorage.setItem("idPrToReserve", id);
  location.replace("reservation.html");
}

function displayProductToReserve() {
  var idPr = localStorage.getItem("idPrToReserve");
  var searchedPr = searchById(Number(idPr), "products");
  document.getElementById("prToReserveName").innerHTML = searchedPr.productName;
  document.getElementById("prToReservePrice").innerHTML =
    searchedPr.price + " DT";
  document.getElementById("prToReserveStock").innerHTML =
    searchedPr.stock + " Pieces";
}

function validateReservation() {
  var qty = document.getElementById("prToReserveQty").value;
  var idPr = localStorage.getItem("idPrToReserve");
  var searchedPr = searchById(Number(idPr), "products");
  if (Number(qty) <= Number(searchedPr.stock) && Number(qty) > 0) {
    var connectedUser = JSON.parse(localStorage.getItem("connectedUser"));
    var idOrder = JSON.parse(localStorage.getItem("idOrder") || "1");

    var order = {
      id: idOrder,
      qty: qty,
      idPr: idPr,
      idUser: connectedUser.id,
    };
    var orders = JSON.parse(localStorage.getItem("orders") || "[]");
    orders.push(order);
    localStorage.setItem("orders", JSON.stringify(orders));
    localStorage.setItem("idOrder", idOrder + 1);

    var products = JSON.parse(localStorage.getItem("products") || "[]");
    for (let i = 0; i < products.length; i++) {
      if (products[i].id === Number(idPr)) {
        products[i].stock = Number(products[i].stock) - Number(qty);
      }
    }
    localStorage.setItem("products", JSON.stringify(products));
    location.replace("cart.html");
  } else {
    document.getElementById("qtyError").innerHTML = "Invalid Quantity";
    document.getElementById("qtyError").style.color = "red";
  }
}

function basket() {
  var connectedUser = JSON.parse(localStorage.getItem("connectedUser"));
  var orders = JSON.parse(localStorage.getItem("orders") || "[]");
  var myOrders = [];
  for (let i = 0; i < orders.length; i++) {
    if (orders[i].idUser === connectedUser.id) {
      myOrders.push(orders[i]);
    }
  }
  var orderTable = `<table class="table">
  <thead>
      <tr>
          <th scope="col">Product</th>
          <th scope="col">Price</th>
          <th scope="col">Quantity</th>
          <th scope="col">Total</th>
          <th scope="col">Actions</th>
      </tr>
  </thead>
  <tbody>`;
  var sum = 0;
  for (let i = 0; i < myOrders.length; i++) {
    var pr = searchById(Number(myOrders[i].idPr), "products");
    var totalPrPrice = Number(pr.price) * Number(myOrders[i].qty);
    sum = sum + totalPrPrice;
    orderTable =
      orderTable +
      `<tr>
    <td>
        <div class="media">
            <div class="d-flex">
                <img src="img/cart.jpg" alt="">
            </div>
            <div class="media-body">
                <p>${pr.productName}</p>
            </div>
        </div>
    </td>
    <td>
        <h5> ${pr.price} DT</h5>
    </td>
    <td>
    ${myOrders[i].qty}
    </td>
    <td>
        <h5>${totalPrPrice}</h5>
    </td>

    <td>
        <button class="btn btn-danger" onclick="deleteOrder(${searchObjectPosition(
          myOrders[i].id,
          "orders"
        )}, ${myOrders[i].id})">Delete</button>
        <button class="btn btn-warning" 
        onclick="editOrder(${myOrders[i].id})">Edit</button>
    </td>
    
</tr>`;
  }

  orderTable =
    orderTable +
    `
  <tr class="bottom_button">
  <td>
  </td>
  <td>

  </td>
  <td>

  </td>
  <td>

  </td>
</tr>
<tr>
  <td>

  </td>
  <td>

  </td>
  <td>
      <h5>Subtotal</h5>
  </td>
  <td>
      <h6> ${sum}DT</h6>
  </td>
</tr>

</tbody>
</table>`;

  document.getElementById("orderTableHTML").innerHTML = orderTable;
}

function deleteOrder(position, id) {
  var order = searchById(Number(id), "orders");
  var qty = order.qty;
  var products = JSON.parse(localStorage.getItem("products") || "[]");
  for (let i = 0; i < products.length; i++) {
    if (products[i].id === Number(order.idPr)) {
      products[i].stock = products[i].stock + Number(qty);
    }
  }
  localStorage.setItem("products", JSON.stringify(products));
  deleteObject(position, "orders");
}

function searchPr(e) {
  var key = e.keyCode;
  if (key == 13) {
    var categoryToSearch = document.getElementById("categoryToSearch").value;
    localStorage.setItem("category", categoryToSearch);
    location.replace("result.html");
  }
}

function displayProductsByCategory() {
  var products = JSON.parse(localStorage.getItem("products"));
  var category = localStorage.getItem("category");
  var searchProducts = [];
  for (let i = 0; i < products.length; i++) {
    if (products[i].category === category) {
      searchProducts.push(products[i]);
    }
  }
  var productTable = ``;
  for (let i = 0; i < searchProducts.length; i++) {
    var productTable =
      productTable +
      `									
      <!-- single product -->
      <div class="col-lg-4 col-md-6">
          <div class="single-product">
              <img class="img-fluid" src="img/product/p1.jpg" alt="">
              <div class="product-details">
                  <h6>${searchProducts[i].productName}</h6>
                  <div class="price">
                      <h6>${searchProducts[i].price}</h6>
                      <h6 class="l-through">${searchProducts[i].stock}</h6>
                  </div>

              </div>
              <button class="primary-btn" onclick="goToReservation(${searchProducts[i].id})" style="border-radius: 0px; width: 100%; ">Reserve</button>
          </div>
      </div>
                                `;
  }
  document.getElementById("result").innerHTML = productTable;
}

function editOrder(id) {
  var order = searchById(id, "orders");
  var editFormOrder = `
   
							<div class="col-md-12 form-group">
								<input type="number" class="form-control" id="editQty" name="name" value=${order.qty} placeholder="Price" >
              </div>
              <span id='qtyEditError'></span>
							<div class="col-md-12 form-group">
								<button type="submit" value="submit" onclick="validateEditOrder(${order.id})" class="primary-btn">Edit Order</button>
                            </div>`;
  document.getElementById("editFormOrderHTML").innerHTML = editFormOrder;
}

function validateEditOrder(id) {
  var newQty = document.getElementById("editQty").value;
  var order = searchById(id, "orders");
  var product = searchById(Number(order.idPr), "products");
  var diff = Number(newQty) - order.qty;
  if (product.stock < diff) {
    document.getElementById("qtyEditError").innerHTML = "Invalid stock";
    document.getElementById("qtyEditError").style.color = "red";
  } else {
    // update order
    var orders = JSON.parse(localStorage.getItem("orders") || "[]");
    for (let i = 0; i < orders.length; i++) {
      if (orders[i].id === id) {
        orders[i].qty = Number(newQty);
      }
    }
    localStorage.setItem("orders", JSON.stringify(orders));
    // update product stock
    var products = JSON.parse(localStorage.getItem("products") || "[]");
    for (let i = 0; i < products.length; i++) {
      if (products[i].id === Number(order.idPr)) {
        products[i].stock = products[i].stock - Number(diff);
      }
    }
    localStorage.setItem("products", JSON.stringify(products));

    location.reload();
  }
}

function orderNbr() {
  var orders = JSON.parse(localStorage.getItem("orders") || "[]");
  var connectedUser = JSON.parse(localStorage.getItem("connectedUser"));
  var orderNbr = 0;
  for (let i = 0; i < orders.length; i++) {
    if (orders[i].idUser === connectedUser.id) {
      // orderNbr = orderNbr + 1;
      orderNbr += 1;
    }
  }
  document.getElementById("ordersNbrHTML").innerHTML = "( " + orderNbr + " )";
}

function logout() {
  localStorage.removeItem("connectedUser");
  location.reload();
}


function experienceStyle(exp) {
  if (exp>=10 && exp <=12) {
    var expStyle = ` <td class='green'>`;
  } else if (exp>=5 && exp < 10){
    var expStyle = ` <td class='orange'>`;
  } else {
    var expStyle = ` <td class='red'>`;
  }
  return expStyle;
}