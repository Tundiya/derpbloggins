

class CardPost {
    constructor(title, content){
        this.title = title;
        this.content = content;   
    }
    //there I am going to generate html for the card 
    generateCardHTML(){
        const cardContainer = document.createElement('div');
        cardContainer.classList.add("col");
        
        const cardBody = document.createElement('div');
        cardBody.classList.add('card');
        cardBody.classList.add('back_splash');

        const cardInner = document.createElement('div');
        cardInner.classList.add('card-body');

        const strapRow = document.createElement('div');
        strapRow.classList.add('row');

        const strapTitle = document.createElement('div');
        strapTitle.classList.add('col');
        strapTitle.classList.add('card_straps');

        const cardTitle = document.createElement('h5');
        cardTitle.classList.add('card-title');
        cardTitle.textContent = this.title;

        const contentRow = document.createElement('div');
        contentRow.classList.add('row');

        const contentBody = document.createElement('div');
        contentBody.classList.add('col');
        contentBody.classList.add('card-content-css');

        const cardText = document.createElement('p');
        cardText.classList.add('card-text');
        cardText.textContent = this.content.substring(0, 195) + '...';
        

        const cardDate = document.createElement('div');
        cardDate.classList.add('card-footer');
        cardDate.textContent = this.date;

        //append elements to to build card structure
        //append elements to to build card structure
        strapTitle.appendChild(cardTitle);
        strapRow.appendChild(strapTitle);
        cardInner.appendChild(strapRow);
        
        contentBody.appendChild(cardText);
        contentBody.appendChild(cardDate);
        contentRow.appendChild(contentBody);
        cardInner.appendChild(contentRow);

        cardBody.appendChild(cardInner);
        cardContainer.appendChild(cardBody);

        //event listener for each created card
        cardContainer.addEventListener('click', async (event) => {
            try {
    
                const postId = event.currentTarget.getAttribute('data-post-id');
                //fetch full NON TRUNCATED CONTENT FROM SERVER
                const response = await fetch(`./backend/posts.json?id=${postId}`);
                const postData = await response.json();
    
                //pass content into modal
                openModal(postData.title, postData.content);
            } catch (error) {
                console.error('Error fetching full post content', error);
            }
        });
    
        return cardContainer;
    }
    saveToFile(){        //create object to represent the new card/post
         const newCardPost = {
            title: this.title,
            content: this.content
        };

    fetch('http://127.0.0.1:3000/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newCardPost)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response very not okay');
        } else if (response.ok) {
            console.log('Post saved successfully');
        }
    })
    .catch(error => {
        console.error('Problem with the fetch:', error.message);
    });
    
    }
}


function generatePostHTML(postId, title, content, date) {
    const cardContainer = document.createElement('div');
    cardContainer.classList.add("col");
    cardContainer.setAttribute('data-post-id', postId);
    
    const cardBody = document.createElement('div');
    cardBody.classList.add('card');
    cardBody.classList.add('back_splash');

    const cardInner = document.createElement('div');
    cardInner.classList.add('card-body');

    const strapRow = document.createElement('div');
    strapRow.classList.add('row');

    const strapTitle = document.createElement('div');
    strapTitle.classList.add('col');
    strapTitle.classList.add('card_straps');

    const cardTitle = document.createElement('h5');
    cardTitle.classList.add('card-title');
    cardTitle.textContent = title;

    const contentRow = document.createElement('div');
    contentRow.classList.add('row');

    const contentBody = document.createElement('div');
    contentBody.classList.add('col');
    contentBody.classList.add('card-content-css');

    const cardText = document.createElement('p');
    cardText.classList.add('card-text');
    cardText.textContent = content.substring(0, 195) + '...';

    const cardDate = document.createElement('div');
    cardDate.classList.add('card-footer');
    cardDate.textContent = date;

    //append elements to to build card structure
    strapTitle.appendChild(cardTitle);
    strapRow.appendChild(strapTitle);
    cardInner.appendChild(strapRow);
    
    contentBody.appendChild(cardText);
    contentBody.appendChild(cardDate);
    contentRow.appendChild(contentBody);
    cardInner.appendChild(contentRow);

    cardBody.appendChild(cardInner);
    cardContainer.appendChild(cardBody);

    //event listener for each created card
    cardContainer.addEventListener('click', async (event) => {
        try {

            const postId = event.currentTarget.getAttribute('data-post-id');
            //fetch full NON TRUNCATED CONTENT FROM SERVER
            const response = await fetch(`./backend/posts.json?id=${postId}`);
            const postData = await response.json();

            const posts = postData.postArray || [];
            for (prop of posts) {
                //console.log(prop);
            }
            const selectedPost = posts.find(post => post.postId === parseInt(postId));
            console.log(selectedPost);
            //pass content into modal
            openModal(selectedPost.title, selectedPost.content, selectedPost.createdAt);
        } catch (error) {
            console.error('Error fetching full post content', error);
        }
    });

    return cardContainer;
    
};


//call the veiwing modal function
function openModal(title, content){
    const modal = document.getElementById('modal_for_viewing');

    const modalTitle = modal.querySelector('.modal-title');
    modalTitle.textContent = title;

    const modalBody  = modal.querySelector('.modal-body');

    ///clear existing content
    modalBody.innerHTML = '';

    //populate the modal with full blog post version
    const titleElement = document.createElement('h5');
    titleElement.textContent = title;

    const contentElement = document.createElement('p');
    contentElement.textContent = content;

    modalBody.appendChild(contentElement);

    //show the modal using bootstraps modal
    const bootstrapModal = new bootstrap.Modal(modal);
    bootstrapModal.show();
}

document.addEventListener('DOMContentLoaded', async function() {
    try {
        // Fetch posts from the server
        const response = await fetch('./backend/posts.json');
        const postsData = await response.json();

        // Get the array of posts with key "postId"
        const posts = postsData.postArray || [];
        posts.sort((a,b) => b.postId - a.postId);

        // Iterate through each post and render it on the page
        const container = document.getElementById('my_card_posts');
        posts.forEach(post => {
            const cardElement = generatePostHTML(post.postId, post.title, post.content, post.createdAt);
            container.appendChild(cardElement);
        });
    } catch (error) {
        console.error('Error fetching posts:', error.message);
    }


    //init modal
    var myModal = new bootstrap.Modal(document.getElementById('modal_for_posting'));
    //eventlistener for save btn
    document.getElementById('make_post').addEventListener('click', function(){
        myModal.show();  //this calls modal_for_posting when the make_post when is clicked
    });

    //event listener for the save button within the modal_for_posting
    document.getElementById('savePost').addEventListener('click', async function() {
        let title = document.getElementById('postTitle').value;
        let content = document.getElementById('postContent').value;
        let date = new Date().toLocaleDateString();

        //creating new post object
        const newCardPost = new CardPost(title, content, date);

        //save data to server using the saveToFile function in the class
        await newCardPost.saveToFile();

        myModal.hide();

        //clear input fields
        document.getElementById('postTitle').value = '';
        document.getElementById('postContent').value = '';

        //generate html for the card element
        const cardElement = newCardPost.generateCardHTML();
        //append card to correct container
        const container = document.getElementById('my_card_posts');
        container.insertBefore(cardElement, container.firstChild);
    });
});