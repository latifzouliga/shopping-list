const itemForm = document.getElementById('item-form');
const itemInput = document.getElementById('item-input');
const itemList = document.getElementById('item-list');
const clearBtn = document.getElementById('clear');
const itemFilter = document.getElementById('filter');

// Add an Item
function addItem(e) {
	e.preventDefault();

	const newItem = itemInput.value;

	if (newItem === '') {
		alert('Please add and Item');
		return;
	}

	const li = document.createElement('li');
	li.appendChild(document.createTextNode(newItem));

	const button = createButton('remove-item btn-link text-red');
	const icon = createIcon('fa-solid fa-xmark');

	button.appendChild(icon);
	li.appendChild(button);

	// Add li to DOM
	itemList.appendChild(li);

	checkUI();

	itemInput.value = '';
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

// Remove Items (Event delegation)
const removeItem = (e) => {
	if (e.target.parentElement.classList.contains('remove-item')) {
		const itemToDelete = e.target.parentElement.parentElement;
		const confirmItemDeletion = confirm(
			`Are you sure you want to delete: ${itemToDelete.innerText}`
		);
		if (confirmItemDeletion) {
			itemToDelete.remove();
		}
	}
	checkUI();
};

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
	const items = itemList.querySelectorAll('li');

	if (items.length === 0) {
		clearBtn.style.display = 'none';
		itemFilter.style.display = 'none';
	} else {
		clearBtn.style.display = 'block';
		itemFilter.style.display = 'block';
	}
}

// Event Listners
itemForm.addEventListener('submit', addItem);
itemList.addEventListener('click', removeItem);
clearBtn.addEventListener('click', clearItems);
itemFilter.addEventListener('input', filterItems);

checkUI();
