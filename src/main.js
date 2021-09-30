'use strict';
//json파일로부터 데이터(items) 가져오기
function loadItems() {
  return fetch('data/data.json')
    .then(response => response.json())
    .then(json => json.items);
}

//items를 element로 만들기
function createItems(item) {
  const img = document.createElement('img');
  img.setAttribute('src', item.image);
  img.setAttribute('class', 'thumbnail');

  const span = document.createElement('span');
  span.setAttribute('class', 'description');
  span.innerText = `${item.gender}, ${item.size} size`;

  const li = document.createElement('li');
  li.setAttribute('class', 'item');
  li.setAttribute('data-type', item.type);
  li.setAttribute('data-color', item.color);
  li.append(img);
  li.append(span);
  return li;
}

function onButtonClick(event, items) {
  const target = event.target;
  const key = target.dataset.key;
  const value = target.dataset.value;
  if (key == null || value == null) {
    return;
  }

  filterItems(items, key, value);
}

//클릭에 따라 아이템 필터링하기
function filterItems(items, key, value) {
  items.forEach(item => {
    if (item.dataset[key] === value) {
      item.classList.remove('invisible');
    } else {
      item.classList.add('invisible');
    }
  });
  displayItems(items);
}

//필터링한 아이템 보여주기
function displayItems(items) {
  items.forEach(item => {
    if (item.classList.contains('invisible')) {
      item.style.display = 'none';
    } else {
      item.style.display = 'flex';
    }
  });
}

//logo 클릭 시 전체 아이템 보여주기
function showAllItems(items) {
  items.forEach(item => {
    item.style.display = 'flex';
  });
}

//main
loadItems().then(items => {
  const elements = items.map(createItems);
  const container = document.querySelector('.items');
  container.append(...elements); //elements 만든거 ul에 넣기
  const buttons = document.querySelector('.buttons');
  buttons.addEventListener('click', event => onButtonClick(event, elements));

  const logo = document.querySelector('.logo');
  logo.addEventListener('click', () => showAllItems(elements));
});
