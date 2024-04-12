document.addEventListener('DOMContentLoaded', () => {
    // Click event listener for the button
    const imagesButton = document.getElementById('imagesbtn');
    imagesButton.addEventListener('click', (e) => {
        e.preventDefault();
        generateImages();
    });

    // Mouseover event listener for the button
    imagesButton.addEventListener('mouseover', () => {
        imagesButton.style.background = 'green';
    });

    // Mouseout event listener for the button
    imagesButton.addEventListener('mouseout', () => {
        imagesButton.style.backgroundColor = 'plum';
    });

    // Function to fetch images from the API
    function generateImages() {
        fetch('https://api.artic.edu/api/v1/artworks/search?q=cats')
            .then(res => {
                if (!res.ok) {
                    throw new Error('Failed to generate images');
                }
                return res.json();
            })
            .then(data => {
                showImages(data.data);
            })
            .catch(error => {
                console.error('Error in generating Images');
            });
    }

    // Function to append images with like and dislike buttons to the DOM
    function showImages(catImg) {
        const imgContainer = document.getElementById('artwork-container');
        imgContainer.innerHTML = ''; // Clear previous content

        for (let i = 0; i < catImg.length; i++) {
            const imageWrapper = document.createElement('div');
            imageWrapper.className = 'image-wrapper';

            const imgElement = document.createElement('img');
            imgElement.src = catImg[i].thumbnail.lqip;
            imgElement.alt = 'cat images';
            imgElement.style.width = '200px';
            imgElement.style.height = '200px';

            // Create like button
            const likeButton = document.createElement('button');
            likeButton.textContent = 'Like';
            likeButton.className = 'like-button btn btn-success';
            likeButton.addEventListener('click', (e) => {
                e.preventDefault();
                handleLikeDislike('like');
                likeButton.style.backgroundColor = 'green';
            });

            // Create dislike button
            const dislikeButton = document.createElement('button');
            dislikeButton.textContent = 'Dislike';
            dislikeButton.className = 'dislike-button btn btn-danger';
            dislikeButton.addEventListener('click', (e) => {
                e.preventDefault();
                handleLikeDislike('dislike');
                dislikeButton.style.backgroundColor = 'red';
            });

            // Append elements to image wrapper
            imageWrapper.appendChild(imgElement);
            imageWrapper.appendChild(likeButton);
            imageWrapper.appendChild(dislikeButton);

            // Append image wrapper to container
            imgContainer.appendChild(imageWrapper);
        }
    }

    // Function to handle like and dislike actions
    function handleLikeDislike(action) {
        // This function should handle the like/dislike action
        // For example, it can send a request to your backend to record the action
        // You can customize this function based on your application's requirements
        console.log(`Action: ${action}`);
    }
});
