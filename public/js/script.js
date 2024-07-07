(function() {
    emailjs.init("THkCmNTXu2RIVAw2i");
})();
document.getElementById('contact-form').addEventListener('submit', function(event) {
    event.preventDefault();        
    // These IDs from the previous steps
    emailjs.sendForm('service_3izqhsq', 'template_6ijzxuo', this)
        .then(function() {
            alert('SUCCESS!');
        }, function(error) {
            alert('FAILED...', error);
        });
});

// Filters 
document.addEventListener('DOMContentLoaded', () => {
    const dropdownContent = document.getElementById('dropdown-content');
    const selectedCategories = document.getElementById('selected-categories');
    const dropbtn = document.querySelector('.dropbtn');
    const categoriesInput = document.getElementById('categories-input');

    dropdownContent.addEventListener('click', (event) => {
        if (event.target.tagName === 'A') {
            event.preventDefault();
            const category = event.target.getAttribute('data-value');
            addCategory(category);
            dropdownContent.style.display = 'none'; // Close dropdown
        }
    });

    dropbtn.addEventListener('click', () => {
        dropdownContent.style.display = dropdownContent.style.display === 'block' ? 'none' : 'block';
    });

    function addCategory(category) {
        if (!categoriesInput.value.includes(category)) {
            const categoryElement = document.createElement('span');
            categoryElement.textContent = category;
            categoryElement.className = 'category-tag';
            
            const removeButton = document.createElement('button');
            removeButton.textContent = 'x';
            removeButton.className = 'remove-category';
            removeButton.addEventListener('click', () => {
                selectedCategories.removeChild(categoryElement);
                updateCategoriesInput();
            });
            
            categoryElement.appendChild(removeButton);
            selectedCategories.appendChild(categoryElement);
            updateCategoriesInput();
        }
    }

    function updateCategoriesInput() {
        const categories = Array.from(selectedCategories.querySelectorAll('.category-tag'))
            .map(tag => tag.textContent.replace('x', '').trim());
        categoriesInput.value = categories.join(',');
    }

    document.addEventListener('click', (event) => {
        if (!event.target.closest('.dropdown')) {
            dropdownContent.style.display = 'none';
        }
    });
});
// Search
const searchInput = document.getElementById('searchInput');
        const blogCards = document.querySelectorAll('.blog_card');

        searchInput.addEventListener('input', function (e) {
            const searchTerm = e.target.value.toLowerCase();

            blogCards.forEach(card => {
                const title = card.querySelector('h2').innerText.toLowerCase();
                const content = card.querySelector('p').innerText.toLowerCase();
                const categories = card.getAttribute('data-categories').toLowerCase();

                if (title.includes(searchTerm) || content.includes(searchTerm) || categories.includes(searchTerm)) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });