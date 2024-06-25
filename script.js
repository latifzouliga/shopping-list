const itemForm = document.getElementById('item-form');
const itemInput = document.getElementById('item-input');
const itemList = document.getElementById('item-list');
const clearBtn = document.getElementById('clear');
const itemFilter = document.getElementById('filter');
const formBtn = itemForm.querySelector('button');
let isEditMode = false;

function displayItems() {
	const itemsFromStorage = getIemsFromStorage();
	itemsFromStorage.forEach((item) => addItemToDOM(item));
	checkUI();
}

// Add an Item
function addItemSubmit(e) {
	e.preventDefault();

	const newItem = itemInput.value;

	// validate input
	if (newItem === '') {
		alert('Please add and Item');
		return;
	}

	// Check for edit mode
	if (isEditMode) {
		const itemToEdit = itemList.querySelector('.edit-mode');

		removeItemFromStorage(itemToEdit.textContent);
		itemToEdit.classList.remove('edit-mode');
		itemToEdit.remove();
		isEditMode = false;
	}

	if (checkIfItemExists(newItem)) {
		alert(`${newItem} already exists. Please Enter Different Item`);
		return;
	}

	addItemToDOM(newItem);
	addItemToStorage(newItem);
	checkUI();

	itemInput.value = '';
}

// Add Item to DOM
function addItemToDOM(item) {
	const li = document.createElement('li');
	li.appendChild(document.createTextNode(item));

	const button = createButton('remove-item btn-link text-red');
	const icon = createIcon('fa-solid fa-xmark');

	button.appendChild(icon);
	li.appendChild(button);

	// Add li to DOM
	itemList.appendChild(li);
}

// Create Button
function createButton(classes) {
	const button = document.createElement('button');
	button.className = classes;
	return button;
}

// Create Icon
function createIcon(classes) {
	const icon = document.createElement('i');
	icon.className = classes;
	return icon;
}

// add Item to Storage
function addItemToStorage(item) {
	const itemsFromStorage = getIemsFromStorage();

	// Add new item to array
	itemsFromStorage.push(item);

	// convert to JSON string and set to local storage
	localStorage.setItem('items', JSON.stringify(itemsFromStorage));
}

// get items from local storage
function getIemsFromStorage() {
	let itemsFromStorage;

	// check localStorage
	if (localStorage.getItem('items') === null) {
		itemsFromStorage = [];
	} else {
		itemsFromStorage = JSON.parse(localStorage.getItem('items'));
	}
	return itemsFromStorage;
}

function onclickItem(e) {
	if (e.target.parentElement.classList.contains('remove-item')) {
		removeItem(e.target.parentElement.parentElement);
	} else {
		setItemToEdit(e.target);
	}
}

// check if Item exists
function checkIfItemExists(item) {
	return getIemsFromStorage().includes(item);
}

function setItemToEdit(item) {
	isEditMode = true;

	itemList
		.querySelectorAll('li')
		.forEach((i) => i.classList.remove('edit-mode'));

	item.classList.add('edit-mode');
	formBtn.innerHTML = '<i class="fa-solid fa-pen"></i> Update Item';
	formBtn.style.backgroundColor = '#08a14a';
	itemInput.value = item.textContent;
}

// Remove Items (Event delegation)
const removeItem = (item) => {
	if (confirm(`Are you sure you want to delete:  ${item.textContent}`)) {
		item.remove();

		removeItemFromStorage(item.textContent);

		checkUI();
	}
};

function removeItemFromStorage(item) {
	let itemsFromStorage = getIemsFromStorage();
	console.log(itemsFromStorage);
	itemsFromStorage = itemsFromStorage.filter((i) => i !== item);
	localStorage.setItem('items', JSON.stringify(itemsFromStorage));
}

// Clear Items
const clearItems = function (e) {
	// itemList.innerHTML = '';
	const items = itemList.querySelectorAll('li');
	const confirmItemsToClear = confirm(
		'Are you sure you want to delete all Items'
	);
	if (confirmItemsToClear) {
		while (itemList.firstChild) {
			itemList.removeChild(itemList.firstChild);
		}
	}
	localStorage.removeItem('items');
	checkUI();
};

// filter Items
function filterItems(e) {
	const text = e.target.value.toLowerCase();
	const items = itemList.querySelectorAll('li');

	items.forEach((item) => {
		// const itemName = item.innerText;
		const itemName = item.firstChild.textContent.toLocaleLowerCase();
		if (itemName.indexOf(text) != -1) {
			item.style.display = 'flex';
		} else {
			item.style.display = 'none';
		}
	});
}

// resutl UI
function checkUI() {
	itemInput.value = '';

	const items = itemList.querySelectorAll('li');

	if (items.length === 0) {
		clearBtn.style.display = 'none';
		itemFilter.style.display = 'none';
	} else {
		clearBtn.style.display = 'block';
		itemFilter.style.display = 'block';
	}

	formBtn.innerHTML = '<i class="fa-solid fa-plus"></i> Add Item';
	formBtn.style.backgroundColor = '#333';
	isEditMode = false;
}

// initialze app
function init() {
	// Event Listners
	itemForm.addEventListener('submit', addItemSubmit);
	itemList.addEventListener('click', onclickItem);
	clearBtn.addEventListener('click', clearItems);
	itemFilter.addEventListener('input', filterItems);
	document.addEventListener('DOMContentLoaded', displayItems);
	checkUI();
}

init();
