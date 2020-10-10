const form = document.getElementById('searchForm')
const input = document.getElementById('searchInput')
const result = document.getElementById('resultContainer')
const pagination = document.getElementById('pagination')

const apiURL = 'https://api.lyrics.ovh'

// Handles the search
async function searchApi(val) {
    const res = await fetch (`${apiURL}/suggest/${val}`)
    const data = await res.json()

    showData(data)
}

//Handles the data gotten
function showData(data) {
    // result.innerHTML = `
    //     <ul class='songs'>
    //         ${data.data.map(songs => 
    //            ` 
    //             <li><span>`${songs.artist.name} - ${songs.title}`</span> 
    //             <button class='btn'>Get Lyrics</button>
    //             </li>
    //             `
    //             // console.log(songs.artist.name)
    //         )}
    //     </ul>
    //     `


        result.innerHTML = `
        <ul class="songs">
        ${data.data.map(song => 
            `<li>
        <span><strong>${song.artist.name}</strong> - ${song.title}</span>
        <button class="btn" data-artist="${song.artist.name}" data-songtitle="${song.title}">Get Lyrics</button>
    </li>`
        )
            .join('')}
        </ul>
        `
}

// Event Listeners
form.addEventListener('submit', (e) => {
    e.preventDefault()

    let inputVal = input.value.trim()

    if (!inputVal) {
        const promptRes = prompt('Kindly give a name or an artist')
        inputVal = promptRes.value
 
    } else {
        searchApi(inputVal)
    }
})