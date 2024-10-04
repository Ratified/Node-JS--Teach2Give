// Extract the product ID from the query parameters
const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get('id');

// Function to load the product data and populate the form
const loadProductData = async () => {
    try {
        const response = await fetch(`/api/products/${productId}`);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const product = await response.json();

        // Populate the form with the product data
        document.getElementById('product-id').value = product.id;
        document.getElementById('title').value = product.title;
        document.getElementById('company').value = product.company;
        document.getElementById('price').value = product.price;

        // Convert the date to 'yyyy-MM-dd' format
        const formattedDate = new Date(product.date).toISOString().split('T')[0];
        document.getElementById('date').value = formattedDate;

        document.getElementById('imageUrl').value = product.imageUrl;
    } catch (error) {
        console.error('Failed to load product data:', error);
        alert('Could not load product data. Please check the console for more details.');
    }
};

// Function to handle form submission and send the updated product data to the server
const handleEditFormSubmit = async (event) => {
    event.preventDefault();

    const updatedProduct = {
        title: document.getElementById('title').value,
        company: document.getElementById('company').value,
        price: document.getElementById('price').value,
        date: document.getElementById('date').value,
        imageUrl: document.getElementById('imageUrl').value,
    };

    try {
        const response = await fetch(`http://localhost:5000/api/products/${productId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedProduct),
        });

        const result = await response.json();

        if (result.status === 'ok') {
            alert('Product updated successfully');
            window.location.href = 'index.html';
        } else {
            alert('Failed to update the product');
        }
    } catch (error) {
        console.error('Error updating product:', error);
    }
};

// Load the product data when the page loads
document.addEventListener('DOMContentLoaded', loadProductData);

// Handle form submission
document.getElementById('edit-form').addEventListener('submit', handleEditFormSubmit);