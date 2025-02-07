function toggleReadMore(button) {
    const content = button.previousElementSibling;
    const isVisible = content.style.display === 'block';
    content.style.display = isVisible ? 'none' : 'block';
    button.innerText = isVisible ? 'Read More' : 'Show Less';
}

function filterImages() {
    const searchQuery = document.getElementById('search-bar').value.toLowerCase();
    const selectedCategory = document.getElementById('category-select').value;
    const cards = document.querySelectorAll('.card');

    cards.forEach(card => {
        const category = card.getAttribute('data-category');
        const title = card.querySelector('h3').innerText.toLowerCase();
        const description = card.querySelector('p').innerText.toLowerCase();

        // Check if the card matches the search and category
        const matchesSearch = title.includes(searchQuery) || description.includes(searchQuery);
        const matchesCategory = selectedCategory === 'all' || category === selectedCategory;

        if (matchesSearch && matchesCategory) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}
