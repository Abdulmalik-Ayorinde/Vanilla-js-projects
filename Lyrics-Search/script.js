const form = document.getElementById('searchForm')
const input = document.getElementById('searchInput')
const result = document.getElementById('resultContainer')
const pagination = document.getElementById('pagination')

const apiURL = 'https://api.lyrics.ovh'

// Handles the search
async function searchApi(val) {
    const res = await fetch(`${apiURL}/suggest/${val}`)
    const data = await res.json()

    showData(data)
}

//Handles the data gotten
function showData(data) {
    result.innerHTML = `
        <ul class="songs">
        ${data.data.map(song => 
            `<li>
            <img src="${song.artist.picture_medium}"><span><strong>${song.artist.name}</strong> - ${song.title}</span>
        <button class="btn" data-artist="${song.artist.name}" data-songtitle="${song.title}">Get Lyrics</button>
    </li>`
        )
            .join('')}
        </ul>
        `

    if(data.prev || data.next){
        pagination.innerHTML = `
        ${
            data.prev ? `<button class="btn" onclick="paginationButton('${data.prev}')">Prev</button>`: ''
        }
        ${
            data.next ? `<button class="btn" onclick="paginationButton('${data.next}')">Next</button>`: ''
        }
        `
    }
    else {
        pagination.innerHTML = ""
    }
}

async function paginationButton(url) {
    const resp = await fetch(`https://cors-anywhere.herokuapp.com/${url}`)
    const data = await resp.json()

    showData(data)
}

async function showlyrics(artist, songTitle) {
    const resp = await fetch(`${apiURL}/v1/${artist}/${songTitle}`)
    const data = await resp.json()

    const lyrics = data.lyrics.replace(/(\r\n\|\r|\n)/g, '<br>')
    result.innerHTML = `<h2><strong>${artist}</strong> - ${songTitle}</h2> <span>${lyrics}</span>`

    pagination.innerHTML = ''
}

// Event Listeners
form.addEventListener('submit', (e) => {
    e.preventDefault()

    let inputVal = input.value.trim()

    if (!inputVal) {
        const promptRes = prompt('Kindly give a name or an artist')
        inputVal = promptRes
    }
        searchApi(inputVal)
})

result.addEventListener('click', e => {
    const wholeBodyElement = e.target
    
    if (wholeBodyElement.tagName = 'BUTTON'){
        const artistName = wholeBodyElement.getAttribute('data-artist')
        const songTitle = wholeBodyElement.getAttribute('data-songtitle')

        showlyrics(artistName, songTitle)
    }
})