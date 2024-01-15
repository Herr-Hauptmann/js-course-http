const postList = document.getElementsByClassName("posts")[0];
const postItem = document.getElementsByClassName("post-item")[0];
const loadPostsBtn = document.getElementById("fetch-posts-btn");
const newPostForm = document.getElementById("new-post-form");

loadPostsBtn.addEventListener('click', () => {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', "https://jsonplaceholder.typicode.com/posts");
    xhr.responseType = "json";
    xhr.onload = function (){
        const listOfPosts = xhr.response;
        for(const post of listOfPosts)
        {
            const item = postItem.cloneNode(true);
            item.querySelector('h2').textContent = post.title;
            item.querySelector('p').textContent = post.body;
            item.id = `post-${post.id}`
            item.classList.remove('d-none');
            postList.append(item);
        }
    }
    xhr.send();
});

newPostForm.addEventListener("submit", (event) =>{
    event.preventDefault();
    const xhr = new XMLHttpRequest();
    xhr.open('POST', "https://jsonplaceholder.typicode.com/posts");
    xhr.responseType = "json";
    const newPost = {
        title: document.getElementById("title").value,
        body: document.getElementById("content").value,
        userId: parseInt(Math.random()*100),
    }
    xhr.send(JSON.stringify(newPost));
    xhr.onload = () =>{
        alert("Kreiran novi post!");
        newPostForm.reset()
    }
});

postList.addEventListener("click", event => {
    if(event.target.tagName === "BUTTON")
    {
        const postId = event.target.closest('li').id.split('-')[1];
        const xhr = new XMLHttpRequest();
        xhr.open("DELETE", `https://jsonplaceholder.typicode.com/posts/${postId}`);
        xhr.send();
    }
});