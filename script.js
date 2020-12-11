const querySelector = elemento => document.querySelector(elemento);
const querySelectorAll = elemento => document.querySelectorAll(elemento);

pizzaJson.map( (item, index) => {
  let pizzaItem = querySelector('.models .pizza-item').cloneNode(true);
  // Preencher as informações em pizzaItem

  querySelector('.pizza-area').append( pizzaItem );
});