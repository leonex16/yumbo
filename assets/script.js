let $productTemplate = document.getElementById('product-template').content;
let $resultsContainer = document.querySelector('.results-container__result');
let $fragment = document.createDocumentFragment();
let $loader = document.querySelector('.loader');
let $resultsContainerText = document.querySelector('.results-container');

// https://stackoverflow.com/questions/990904/remove-accents-diacritics-in-a-string-in-javascript
let removeAccent = str => str.normalize('NFD').replace(/\u0301/g, "");
let formatEAN8 = str => {
  let codeFormated = '';
  let iLetter = 0;

  for (let letter of str.split('')) {
    iLetter++;
    if (iLetter === 4 || iLetter === 8) {
      codeFormated += letter + ' ';
    } else {
      codeFormated += letter;
    };
  }

  return codeFormated.trim();
};
let formatEAN13 = str => {
  let codeFormated = '';
  let iLetter = 0;

  for (let letter of str.split('')) {
    iLetter++;
    if (iLetter === 3 || iLetter === 7 || iLetter === 12) {
      codeFormated += letter + ' ';
    } else {
      codeFormated += letter;
    };
  }
  return codeFormated.trim();
};
let getProduct = (productName, section) => {
  fetch('assets/db.json')
    .then(response => response.json())
    .then(json => {
      json.products.forEach(product => {
        let regex = new RegExp(removeAccent(productName), 'gmi');
        console.log(regex.test(removeAccent(product.name)) && (section === 'Todas' || section === 'Todas'));
        if (regex.test(removeAccent(product.name)) && (section === product.section || section === 'Todas')) {
          $fragment.appendChild(insertProduct(product, document.importNode($productTemplate, true)));
        };
      });

      if ($fragment.childElementCount !== 0) {
        $resultsContainer.previousElementSibling.lastElementChild.style.display = 'none';
        $resultsContainer.appendChild($fragment);
      } else {
        $resultsContainer.previousElementSibling.lastElementChild.style.display = 'block';
      };
        setTimeout(() => switchMode(1), 300);
    });
};

let insertProduct = (product, $clone) => {
  $clone.querySelector('img').src = product.img;
  $clone.querySelector('img').alt = product.name;
  $clone.querySelector('p').textContent = product.name;
  $clone.querySelector('output').textContent = product.code.length === 13 ? formatEAN13(product.code) : formatEAN8(product.code);
  return $clone;
};

let loadProductMostWanted = () => {
  let prodectMostWanted = [
    'Pimentón Verde',
    'Pimentón Amarillo',
    'Pimentón Rojo',
    'Pepino',
    'Piña',
  ];
  fetch('assets/db.json')
    .then(response => response.json())
    .then(json => {
      json.products.forEach(product => {
        if (prodectMostWanted.includes(product.name.trim())) {
          let $clone = document.importNode($productTemplate, true);
          $clone.querySelector('img').src = product.img;
          $clone.querySelector('img').alt = product.name;
          $clone.querySelector('p').textContent = product.name;
          $clone.querySelector('output').textContent = product.code.length === 13 ? formatEAN13(product.code) : formatEAN8(product.code);
          document.querySelector('.product-most-wanted').appendChild($clone);
        };
      });
    });
};

let switchMode = (init = 0) => {
  let $elementDarkBg = document.querySelectorAll('*[data-dark-bg]');
  let $elementDarkTxt = document.querySelectorAll('*[data-dark-txt]');
  let $modeBtn = document.querySelector('.switch-btn');
  let sunEmoji = '&#x2600;';
  let moonEmoji = '&#x1F319;';

  !localStorage.getItem('mode') ? localStorage.setItem('mode', 'light') : false;
  
  if(init === 0){
    if(localStorage.getItem('mode') !== 'light'){
      $modeBtn.innerHTML = sunEmoji;
      localStorage.setItem('mode', 'light');
      $elementDarkBg.forEach(elem => elem.classList.remove('dark-mode'));
      $elementDarkTxt.forEach(elem => elem.classList.remove('light-mode'));
    }else{
      $modeBtn.innerHTML = moonEmoji;
      localStorage.setItem('mode', 'dark');
      $elementDarkBg.forEach(elem => elem.classList.add('dark-mode'));
      $elementDarkTxt.forEach(elem => elem.classList.add('light-mode'));
    };
  }else{  
    if(localStorage.getItem('mode') === 'light' && init === 1){
      $modeBtn.innerHTML = sunEmoji;
      localStorage.setItem('mode', 'light');
      $elementDarkBg.forEach(elem => elem.classList.remove('dark-mode'));
      $elementDarkTxt.forEach(elem => elem.classList.remove('light-mode'));
    }else{
      $modeBtn.innerHTML = moonEmoji;
      localStorage.setItem('mode', 'dark');
      $elementDarkBg.forEach(elem => elem.classList.add('dark-mode'));
      $elementDarkTxt.forEach(elem => elem.classList.add('light-mode'));
    };
  };

};


document.addEventListener('submit', e => {
  e.preventDefault();
  $resultsContainerText.style.display = 'block';
  $loader.style.opacity = 1;
  $resultsContainer.innerHTML = '';
  getProduct(e.target.product.value.trim(), e.target.section.selectedOptions[0].textContent.trim());
  $loader.style.opacity = 0;
});

document.addEventListener('click', e => {
  if(e.target.matches('.switch-btn')){
      switchMode();
  };
});

document.addEventListener('DOMContentLoaded', () => {
  loadProductMostWanted();
  setTimeout(() => switchMode(1), 300);
});


if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('./sw.js')
    .then(reg => reg)
    .catch(err => console.warn('Error al tratar de registrar el sw', err))
};