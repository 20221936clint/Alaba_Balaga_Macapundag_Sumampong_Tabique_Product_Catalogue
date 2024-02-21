let previewContainer = document.querySelector('.products-preview');
let previewBoxes = previewContainer.querySelectorAll('.preview');
let addToCartClickCounter = 0;

document.querySelector('.products-container').addEventListener('click', async (event) => {
  let product = event.target.closest('.product');
  
  if (product) {
    previewContainer.style.display = 'flex';
    let name = product.getAttribute('data-name');
    
    previewBoxes.forEach(async (preview) => {
      let target = preview.getAttribute('data-target');
      
      if (name === target) {
        preview.classList.add('active');

        // Example: Fetch additional data based on the product name
        try {
          let response = await fetch(`/api/product-info?name=${name}`);
          if (response.ok) {
            let data = await response.json();
            // Update preview content with fetched data
            preview.querySelector('.preview-content').textContent = data.description;
          } else {
            console.error('Failed to fetch product information');
          }
        } catch (error) {
          console.error('Error during fetch:', error);
        }
      }
    });
  }
});

previewBoxes.forEach((preview) => {
  preview.querySelector('.fa-times').addEventListener('click', () => {
    preview.classList.remove('active');
    previewContainer.style.display = 'none';
  });

  // Add click event listener to the "add to cart" button
  preview.querySelector('.cart').addEventListener('click', () => {
    addToCartClickCounter++;
    if (addToCartClickCounter % 10 === 0) {
      alert('Stop clicking or buy it');
    }
  });
});
