const MENU_URL =
  "https://gist.githubusercontent.com/josejbocanegra/9a28c356416badb8f9173daf36d1460b/raw/5ea84b9d43ff494fcbf5c5186544a18b42812f09/restaurant.json";

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
  menuNames = ["Burguers", "Tacos", "Salads", "Desserts", "Drinks and Sides"];
  menuNumber = menuNames.indexOf(menuName);
  console.log(menuNumber);
}
