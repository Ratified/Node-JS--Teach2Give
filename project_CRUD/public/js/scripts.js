const fetchData = async (showFavorites = false, sortOption = null) => {
    try {
        const response = await fetch('/api/products');  
        let data = await response.json();

        let favorites = JSON.parse(localStorage.getItem('favorites')) || [];

        if (showFavorites) {
            data = data.filter(item => favorites.includes(item.id));
        }

        // Sorting logic
        if (sortOption === 'price-asc') {
            data = data.sort((a, b) => a.price - b.price);
        } else if (sortOption === 'price-desc') {
            data = data.sort((a, b) => b.price - a.price);
        } else if (sortOption === 'date-asc') {
            data = data.sort((a, b) => new Date(a.date) - new Date(b.date));
        } else if (sortOption === 'date-desc') {
            data = data.sort((a, b) => new Date(b.date) - new Date(a.date));
        }

        let output = '';
        const container = document.querySelector('.container');

        data.forEach((item) => {
            const { id, title, date, company, price, imageUrl } = item;
            const isFavorite = favorites.includes(id);

            output += `
                <div class="container__card">
                    <img src=${imageUrl} alt=${company}>
                    <div class="container__card__content">
                        <h2 class="container__card__content__title">${title}</h2>
                        <p class="container__card__content__date">${date}</p>  
                        <p class="container__card__content__description">${company}</p>
                        <p class="container__card__content__price"> ${price} KES</p>
                        <button class="container__card__content__button" data-id="${id}">
                            ${isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
                        </button>
                        <button class="edit-button" data-id="${id}">Edit</button>
                        <button class="delete-button" data-id="${id}">Delete</button>
                    </div>
                </div>
            `;
        });

        container.innerHTML = output;

        // Handle add to favorites
        const buttons = document.querySelectorAll('.container__card__content__button');
        buttons.forEach(button => {
            button.addEventListener('click', (e) => {
                const id = Number(e.target.getAttribute('data-id'));

                if (favorites.includes(id)) {
                    favorites = favorites.filter(favId => favId !== id);
                } else {
                    favorites.push(id);
                }

                localStorage.setItem('favorites', JSON.stringify(favorites));

                fetchData(showFavorites, sortOption); 
            });
        });

        // Handle delete
        const deleteButtons = document.querySelectorAll('.delete-button');
        deleteButtons.forEach(button => {
            button.addEventListener('click', async (e) => {
                const id = e.target.getAttribute('data-id');
                const confirmed = confirm('Are you sure you want to delete this product?');

                if (confirmed) {
                    await deleteProduct(id);  
                    fetchData();  
                }
            });
        });

        // Handle edit
        const editButtons = document.querySelectorAll('.edit-button');
        editButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                const id = e.target.getAttribute('data-id');
                handleEdit(id);
            });
        });
    } catch (error) {
        console.log(error);
    }
};

// Function to delete a product
const deleteProduct = async (id) => {
    try {
        const response = await fetch(`http://localhost/api/products/${id}`, {
            method: 'DELETE',
        });

        if (!response.ok) {
            throw new Error(`Failed to delete product: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error(error);
        alert('Failed to delete the product. Please try again.');
    }
};

// Handle edit logic
const handleEdit = (id) => {
    window.location.href = `edit.html?id=${id}`;  
};

// Sorting event listeners
const sortByAscButton = document.getElementById('sort-price-asc');
const sortByDescButton = document.getElementById('sort-price-desc');
const sortByDateAscButton = document.getElementById('sort-date-asc');
const sortByDateDescButton = document.getElementById('sort-date-desc');

sortByAscButton.addEventListener('click', () => fetchData(false, 'price-asc'));
sortByDescButton.addEventListener('click', () => fetchData(false, 'price-desc'));
sortByDateAscButton.addEventListener('click', () => fetchData(false, 'date-asc'));
sortByDateDescButton.addEventListener('click', () => fetchData(false, 'date-desc'));

// Event listener for "View Favorites"
const viewFavoritesButton = document.getElementById('view-favorites');
viewFavoritesButton.addEventListener('click', () => fetchData(true));

// Initial fetch
fetchData();