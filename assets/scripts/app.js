const postList = document.getElementsByClassName("posts")[0];
const postItem = document.getElementsByClassName("post-item")[0];

const xhr = new XMLHttpRequest();

xhr.open('GET', "https://jsonplaceholder.typicode.com/posts");
xhr.responseType = "json";

xhr.onload = function (){
    const listOfPosts = xhr.response;
    // const listOfPosts = JSON.parse(xhr.response);
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
// xhr.addEventListener('load', ()=>{

// });



xhr.send();