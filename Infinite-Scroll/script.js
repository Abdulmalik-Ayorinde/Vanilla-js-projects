const filter = document.getElementById('filter')
const container = document.getElementById('container')
const loader = document.getElementById('loader')

let limit = 5
let page  = 1

// Fetch from API
async function getData () {
    const res = await fetch(`https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=${limit}`)
    const data = await res.json()

    showData(data)
}

function showData(data) {
    data.forEach(post => {
        const postDiv = document.createElement('div')
        postDiv.classList.add('post')
            postDiv.innerHTML = `
            <div class="number">${post.id}</div>
            <div class="post-info">
                <h2 class="post-title">${post.title}</h2>
                <p class="post-body">${post.body}</p>
            </div>
    `

    container.appendChild(postDiv)
    })

}

function filterPost(e) {
    const text = e.target.value.toUpperCase()
    const posts = document.querySelectorAll('.post')

    posts.forEach(post => {
        const title = post.querySelector('.post-title').innerText.toUpperCase()
        const postData = post.querySelector('.post-body').innerText.toUpperCase()

        if(title.indexOf(text) > -1 || postData.indexOf(text) > -1) {
            post.style.display = 'flex'
        } else {
            post.style.display = 'none'
        }
    })
}

function proceed(){
    loader.classList.add('show')

    setTimeout(() => {
        loader.classList.remove('show')  
    }, 1000)

    setTimeout(() => {
        page++
        getData()
    }, 1000)
}

getData()

window.addEventListener('scroll', () => {
    const {scrollTop, scrollHeight, clientHeight} = document.documentElement

    if(scrollTop + clientHeight >= scrollHeight - 5) {
        proceed()
    }
})

filter.addEventListener('input', filterPost)