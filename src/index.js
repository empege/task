// Products Data
const productsData = [
  {
    id: 0,
    images: ['product-example-1.jpg', 'product-example-5.jpg', 'product-example-12.jpg']
  },
  {
    id: 1,
    images: ['product-example-5.jpg', 'product-example-1.jpg', 'product-example-12.jpg', 'product-example-5.jpg', 'product-example-1.jpg', 'product-example-12.jpg']
  },
  {
    id: 2,
    images: ['product-example-12.jpg', 'product-example-5.jpg', 'product-example-1.jpg']
  }
]


/* ELEMENTS */
const products = document.querySelectorAll('.image-wrapper');
const allSizesDivs = document.querySelectorAll('.sizes-wrapper');
const allSizeItems = document.querySelectorAll('.size-item');
const descriptions = document.querySelectorAll('.description');
const radioForms = document.querySelectorAll('.radio-group-wrapper');
const radioBtns = document.querySelectorAll('.radio');
const hearts = document.querySelectorAll('.heart-icon-wrapper');

products.forEach(current => current.addEventListener('click', (e) => toggleSizes(e)))
allSizeItems.forEach(current => current.addEventListener('click', (e) => addToCart(e)))
descriptions.forEach(current => current.addEventListener('click', (e) => toggleDescription(e)))
radioForms.forEach(current => current.addEventListener('change', () => chooseImage()));
hearts.forEach(heart => heart.addEventListener('click', (e) => addToFavourites(e)));

/* FUNCTIONS */

const toggleSizes = (e) => {

  // get current product (whole article, not any child inside)
  const product = e.currentTarget;
  // get a sizes div of current element
  const sizesDiv = product.querySelector('.sizes-wrapper');

  // remove all open sizes divs unless its a current one (need class to stay afterwards for toggle)
  allSizesDivs.forEach(current => {
    current !== sizesDiv && current.classList.remove('show-flex')
  });
  // show sizes div of current element if hidden, hide if shown
  // if user is clicking on white space between the sizes don't hide.
  sizesDiv.className.includes('show-flex') && !e.target.className.includes('sizes-wrapper') ? sizesDiv.classList.remove('show-flex') : sizesDiv.classList.add('show-flex');
  console.log('Sizes Toggled');

}
const addToCart = (e) => {
  const currentSizeItem = e.target;
  const addToCartDiv = e.target.parentNode.parentNode.querySelector('.add-to-cart-wrapper');
  if (currentSizeItem.nextElementSibling) {
    addToCartDiv.querySelector('h1').innerText = 'Item Added to Cart!';
    addToCartDiv.style.display = 'flex';
    addToCartDiv.style.opacity = '1';
  }
  console.log('Item added to Cart (Size was chosen)');

}
// show more / less of description on click
const toggleDescription = (e) => {
  const clicked = e.target;
  clicked.className.includes('remove-ellipsis') ? clicked.classList.remove('remove-ellipsis') : clicked.classList.add('remove-ellipsis');
  console.log('Toggling description');
}
// radio buttons change image
const chooseImage = () => {
  radioForms.forEach((form, formIndex) => {
    //looping through each radio button now...and setting img based on index (same index of radio btn and image)
    //Nemas pojma NodeLists i Elemente! Koja je razlika, zasto ti jedno ne radi, drugo radi.
    const radioBtns = Array.from(form);
    console.log(radioBtns)

    radioBtns.forEach((radioBtn, radioIndex) => {
      //form.childNodes.forEach((radioBtn, radioIndex, array) => {
      //ZASTO OVDE INDEX (radioIndex) KRECE OD 1 UMEST 0? - U childListi odozgo zakomentovanoj se nalaze i #text neki elementi! Islo je od 0, ali je brojalo i svaki #text ispred inputa, koji ja sam nisam stavio u html
      if (radioBtn.checked) {
        //first form, meaning first product...
        const imgElement = products[formIndex].querySelector('img');
        //index of checked radio btn is the same as image url from images array of that product...
        const imgUrl = productsData[formIndex].images[radioIndex];
        imgElement.src = `assets/images/${imgUrl}`
      }
    })
  })
  console.log('Different Image Chosen');
}
chooseImage();

const addToFavourites = (e) => {
  const clickedHeart = e.currentTarget;
  clickedHeart.className.includes('added-to-favourites') ?
    clickedHeart.classList.remove('added-to-favourites') :
    clickedHeart.classList.add('added-to-favourites');
  console.log('Added / Removed favourite');
}





//Pitanja!:
//1) da li je uopste normalno gadjati elemente tako preko roditelja i siblinga itd jer mi izgleda veoma nestabilno, ali ne vidim drugi nacin jer u reactu npr bi verovatno bilo mnogo drugacije i menjao bi se state unutar komponente (ili neki generalni veliki state objekat), ne bih morao tako da trazim i gadjam vrednosti prema roditeljima i elementima? Ili jos ne znam react dovoljno i samo mislim da je tako?
//Ako su ovo neke npr samostalne komponente onda ce uvek biti iste strukture i ok je da gadjam roditelje, siblinge itd?

// stvari za zapamtiti!:
//JS
//1) e.currentTarget - jer ce e.target davati bilo koje dete na koje se kliknulo (propagation vidi jos malo)
//2) kod eventListenera ovde stavi funkciju u funkciju ako si koristio variablu u kojoj drzis funkciju.
//3) .classList vs .className

//CSS
// white-space: nowrap nikad video
// text-overflow: ellipsis