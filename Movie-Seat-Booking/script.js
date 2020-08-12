const seat = document.querySelectorAll('.row .seat:not(.ocuppied)');
const contain = document.querySelector('.container');
const counter = document.getElementById('count');
const total = document.getElementById('total');
const selectMovie = document.getElementById('movie');
let ticketPrice = +selectMovie.value;


populateUI()

// Event Listener
contain.addEventListener('click', e => {
 if(e.target.classList.contains('seat') && !e.target.classList.contains('ocuppied'))
{
    e.target.classList.toggle('selected')
}
updateCounter()

})

// EventListener for select field change 
selectMovie.addEventListener('change', e => {
    ticketPrice = +e.target.value
    saveData(e.target.selectedIndex, e.target.value)

    updateCounter()
})

updateCounter()

// Counter and Total Update
function updateCounter() {
    const getSelectedSeats = document.querySelectorAll('.row .seat.selected')

    const selectedSeatCounter = getSelectedSeats.length

    const seatSelected = [...getSelectedSeats].map(seats => [...seat].indexOf(seats))

    localStorage.setItem('getSelectedSeats', JSON.stringify(seatSelected))

    counter.innerText = selectedSeatCounter;
    total.innerText = selectedSeatCounter * ticketPrice
}

// Local Storage -- Save movie and price selected
function saveData(movieIndex, moviePrice){
    localStorage.setItem('selectedMovieIndex', movieIndex)
    localStorage.setItem('selectedMoviePrice', moviePrice)
}

function populateUI() {
     const selectedSeat = JSON.parse(localStorage.getItem('getSelectedSeats'))
     
     if(selectedSeat !== null && selectedSeat.length > 0){
        seat.forEach((seats, index) => {
          if(selectedSeat.indexOf(index) > -1){
            seats.classList.add('selected')
          }  
        })
     }

     const selectedMovieIndex = localStorage.getItem('selectedMovieIndex')

     if(selectedMovieIndex !== null){
         selectMovie.selectedIndex = selectedMovieIndex 
     }
}
