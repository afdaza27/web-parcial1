const MENU_URL =
  "https://gist.githubusercontent.com/josejbocanegra/9a28c356416badb8f9173daf36d1460b/raw/5ea84b9d43ff494fcbf5c5186544a18b42812f09/restaurant.json";

let carritoDeCompras = [];

function getMenuByName(menuName) {
  fetch(MENU_URL)
    .then(function (response) {
      return response.json();
    })
    .then(function (jsonResponse) {
      processMenu(menuName, jsonResponse);
    });
}

function processMenu(menuName, menu) {
  menuName = menuName.trim();
  menu.forEach((element) => {
    if (element.name === menuName) {
      displayProducts(element);
    }
  });
}

function displayProducts(element) {
  let displayZone = document.getElementById("content-div");
  displayZone.innerHTML = "";
  let titleCol = document.createElement("div");
  titleCol.setAttribute("class", "col-12");
  titleText = document.createElement("h2");
  titleText.setAttribute("class", "text-center");
  titleText.appendChild(document.createTextNode(element.name));
  titleCol.appendChild(titleText);
  displayZone.appendChild(titleCol);
  displayZone.appendChild(document.createElement("hr"));
  element.products.forEach((product) => {
    let itemCol = document.createElement("div");
    itemCol.setAttribute("class", "col");
    let itemCard = document.createElement("div");
    itemCard.setAttribute("class", "card");
    itemCard.style.width = "18rem";
    itemCard.style.height = "36rem";
    let itemImage = document.createElement("img");
    itemImage.setAttribute("src", product.image);
    itemImage.setAttribute("class", "card-img-top");
    itemImage.setAttribute("height", "180px");
    let cardBody = document.createElement("div");
    cardBody.setAttribute("class", "card-body");
    let itemTitle = document.createElement("h5");
    itemTitle.setAttribute("class", "card-title card-important");
    itemTitle.appendChild(document.createTextNode(product.name));
    let itemDescription = document.createElement("p");
    itemDescription.setAttribute("class", "card-text");
    itemDescription.appendChild(document.createTextNode(product.description));
    let itemPrice = document.createElement("p");
    itemPrice.setAttribute("class", "card-important");
    itemPrice.appendChild(document.createTextNode("$" + product.price));
    let addItemButton = document.createElement("a");
    addItemButton.setAttribute("class", "btn btn-primary add-button");
    addItemButton.setAttribute("id", product.name);
    addItemButton.appendChild(document.createTextNode("Add to car"));
    addItemButton.setAttribute("onclick", "addToCart(this.id)");
    cardBody.appendChild(itemTitle);
    cardBody.appendChild(itemDescription);
    cardBody.appendChild(itemPrice);
    cardBody.appendChild(addItemButton);
    itemCard.appendChild(itemImage);
    itemCard.appendChild(cardBody);
    itemCol.appendChild(itemCard);
    displayZone.appendChild(itemCol);
  });
}

function addToCart(productName) {
  fetch(MENU_URL)
    .then(function (response) {
      return response.json();
    })
    .then(function (jsonResponse) {
      addItemToCart(productName, jsonResponse);
    });
}

function addItemToCart(productName, menu) {
  menu.forEach((menuSection) => {
    menuSection.products.forEach((product) => {
      if (product.name === productName) {
        if (carritoDeCompras.length === 0) {
          carritoDeCompras.push({
            item: carritoDeCompras.length + 1,
            quantity: 1,
            description: productName,
            price: product.price,
            amount: product.price,
          });
        } else {
          let agregado = false;
          carritoDeCompras.forEach((element) => {
            if (element.description === productName) {
              element.quantity += 1;
              element.amount += product.price;
              agregado = true;
            }
          });
          if (!agregado) {
            carritoDeCompras.push({
              item: carritoDeCompras.length + 1,
              quantity: 1,
              description: productName,
              price: product.price,
              amount: product.price,
            });
          }
        }
      }
      updateCartCount();
    });
  });
}

function updateCartCount() {
  document.getElementById("cart-count").innerHTML = getOrderCount() + " items";
}

function showOrder() {
  let displayZone = document.getElementById("content-div");
  displayZone.innerHTML = "";
  let titleCol = document.createElement("div");
  titleCol.setAttribute("class", "col-12");
  titleText = document.createElement("h2");
  titleText.setAttribute("class", "text-center");
  titleText.appendChild(document.createTextNode("Order detail"));
  titleCol.appendChild(titleText);
  displayZone.appendChild(titleCol);
  displayZone.appendChild(document.createElement("hr"));
  let tableDiv = document.createElement("div");
  tableDiv.setAttribute("class", "table table-striped");
  tableDiv.innerHTML =
    "<table class='table table-striped'>" +
    "<thead><tr>" +
    "<th scope='col'>Item</th>" +
    "<th scope='col'>Qty.</th>" +
    "<th scope='col'>Description</th>" +
    "<th scope='col'>Unit Price</th>" +
    "<th scope='col'>Amount</th>" +
    "</tr></thead>" +
    "<tbody id='order-body'></tbody></table>";
  displayZone.appendChild(tableDiv);
  let tableBody = document.getElementById("order-body");
  carritoDeCompras.forEach((element) => {
    let newRow = document.createElement("tr");
    let itemCell = document.createElement("th");
    itemCell.setAttribute("scope", "row");
    itemCell.appendChild(document.createTextNode(element.item));
    newRow.appendChild(itemCell);
    let qtyCell = document.createElement("td");
    qtyCell.appendChild(document.createTextNode(element.quantity));
    newRow.appendChild(qtyCell);
    let descriptionCell = document.createElement("td");
    descriptionCell.appendChild(document.createTextNode(element.description));
    newRow.appendChild(descriptionCell);
    let priceCell = document.createElement("td");
    priceCell.appendChild(document.createTextNode(element.price));
    newRow.appendChild(priceCell);
    let amountCell = document.createElement("td");
    amountCell.appendChild(document.createTextNode(element.amount));
    newRow.appendChild(amountCell);
    tableBody.appendChild(newRow);
  });
  let totalCol = document.createElement("div");
  totalCol.setAttribute("class", "col-6");
  let totalText = document.createElement("p");
  totalText.style.fontWeight = "bold";
  totalText.innerHTML = "Total: $" + getOrderTotal();
  totalCol.appendChild(totalText);
  displayZone.appendChild(totalCol);
  let buttonsCol = document.createElement("div");
  buttonsCol.setAttribute("class", "col-6");
  buttonsCol.innerHTML =
    "<button type='button' class='btn btn-danger' data-toggle='modal' data-target='#confirmCancellation'>" +
    "Cancel" +
    "</button>" +
    "<button type='button' class='btn btn-light order-button' onclick='confirmOrder()'>Confirm order</button>" +
    "<div class='modal fade' id='confirmCancellation' tabindex='-1' role='dialog' aria-labelledby='exampleModalLabel' aria-hidden='true'>" +
    "<div class='modal-dialog' role='document'>" +
    "<div class='modal-content'>" +
    "<div class='modal-header'>" +
    "<h5 class='modal-title' id='cancellationConfirmationLabel'>Cancel the order</h5>" +
    "<button type='button' class='close' data-dismiss='modal' aria-label='Close'>" +
    "<span aria-hidden='true>&times;</span>" +
    "</button>" +
    "</div>" +
    "<div class='modal-body'>" +
    "<h5 class='modal-title'>Are you sure about cancelling the order?</h5>" +
    "</div>" +
    "<div class='modal-footer'>" +
    "<button type='button' class='btn btn-light' data-dismiss='modal' onclick='clearShoppingCart()'>Yes, I want to cancel the order</button>" +
    "<button type='button' class='btn btn-danger' data-dismiss='modal'>No, I want to continue adding products</button>" +
    "</div>" +
    "</div>" +
    "</div>" +
    "</div>";
  displayZone.appendChild(buttonsCol);
}

function getOrderTotal() {
  let total = 0;
  carritoDeCompras.forEach((element) => {
    total += element.amount;
  });
  return total.toFixed(2);
}

function getOrderCount() {
  let total = 0;
  carritoDeCompras.forEach((element) => {
    total += element.quantity;
  });
  return total;
}

function showCancelToast() {
  let displayZone = document.getElementById("content-div");
  let toastDiv = document.createElement("div");
  toastDiv.innerHTML = displayZone.appendChild(toastDiv);
}

function clearShoppingCart() {
  carritoDeCompras = [];
  updateCartCount();
  showOrder();
}

function confirmOrder() {
  console.log(carritoDeCompras);
}
