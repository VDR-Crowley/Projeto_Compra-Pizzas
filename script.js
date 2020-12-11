const querySelector = elemento => document.querySelector(elemento);
const querySelectorAll = elemento => document.querySelectorAll(elemento);

pizzaJson.map( (item, index) => {
  let pizzaItem = querySelector('.models .pizza-item').cloneNode(true);

  pizzaItem.querySelector('.pizza-item--img img').src = item.img;
  pizzaItem.querySelector('.pizza-item--price').innerHTML = `R$ ${item.price.toFixed(2)}`;
  pizzaItem.querySelector('.pizza-item--name').innerHTML = item.name;
  pizzaItem.querySelector('.pizza-item--desc').innerHTML = item.description;

  pizzaItem.querySelector('a').addEventListener('click', event => {
    event.preventDefault();

    querySelector('.pizzaWindowArea').style.opacity = 0;

    querySelector('.pizzaWindowArea').style.display = 'flex';

    setTimeout( () => {
      querySelector('.pizzaWindowArea').style.opacity = 1;
    }, 300);
  });
  
  querySelector('.pizza-area').append( pizzaItem );
});