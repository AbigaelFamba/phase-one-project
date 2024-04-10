javascript
// Variables to keep track of current page and artworks
let currentPage = 1;
const artworksPerPage = 10; // Number of artworks to display per page
let totalArtworks = 0;
let artworks = [];

// Function to fetch artworks from the API based on page number
function fetchArtworks(page) {
    // Replace this URL with the appropriate API endpoint to fetch artworks
    const apiUrl = `https://api.artic.edu/api/v1/artworks/search?page=${page}&limit=${artworksPerPage}`;
    
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            artworks = data.data;
            totalArtworks = data.pagination.total;
            displayArtworks();
        })
        .catch(error => {
            console.error('Error fetching artworks:', error);
        });
}

// Function to display artworks on the page
function displayArtworks() {
    const artworksContainer = document.getElementById('artworks');
    artworksContainer.innerHTML = ''; // Clear previous artworks

    artworks.forEach(artwork => {
        const artworkDiv = document.createElement('div');
        artworkDiv.classList.add('artwork');

        const titleHeading = document.createElement('h2');
        titleHeading.textContent = artwork.title;
        artworkDiv.appendChild(titleHeading);

        const artistParagraph = document.createElement('p');
        artistParagraph.textContent = `Artist: ${artwork.artist_title}`;
        artworkDiv.appendChild(artistParagraph);

        const imageElement = document.createElement('img');
        imageElement.src = artwork.thumbnail.url;
        imageElement.alt = artwork.title;
        artworkDiv.appendChild(imageElement);

        const likeButton = document.createElement('button');
        likeButton.textContent = 'Like';
        likeButton.addEventListener('click', () => {
            // Placeholder for like functionality
            console.log('Liked:', artwork.title);
        });
        artworkDiv.appendChild(likeButton);

        const dislikeButton = document.createElement('button');
        dislikeButton.textContent = 'Dislike';
        dislikeButton.addEventListener('click', () => {
            // Placeholder for dislike functionality
            console.log('Disliked:', artwork.title);
        });
        artworkDiv.appendChild(dislikeButton);

        artworksContainer.appendChild(artworkDiv);
    });

    updatePaginationButtons();
}

// Function to handle previous button click
function goToPreviousPage() {
    if (currentPage > 1) {
        currentPage--;
        fetchArtworks(currentPage);
    }
}

// Function to handle next button click
function goToNextPage() {
    const totalPages = Math.ceil(totalArtworks / artworksPerPage);
    if (currentPage < totalPages) {
        currentPage++;
        fetchArtworks(currentPage);
    }
}

// Function to update pagination buttons based on current page
function updatePaginationButtons() {
    const previousButton = document.getElementById('previousButton');
    const nextButton = document.getElementById('nextButton');

    previousButton.disabled = currentPage === 1;
    nextButton.disabled = currentPage === Math.ceil(totalArtworks / artworksPerPage);
}

// Initial fetch of artworks
fetchArtworks(currentPage);
