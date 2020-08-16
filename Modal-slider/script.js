const toggle = document.getElementById('nav-btn')
const openModal = document.getElementById('cta-btn')
const closeModal = document.getElementById('closebtn')
const menuToggle = document.getElementById('nav-btn')
const modalContainer = document.getElementById('modal-container')



// Show and hide menu 
toggle.addEventListener('click', () => {
    document.body.classList.toggle('nav-display')
    // toggle.classList.toggle('fa .fa-times')


    // toggle.innerHTML = `<i class="fa fa-times"></i>`
})

// Show modal
openModal.addEventListener('click', () => {
    modalContainer.classList.add('display-modal')
})

// Close modal with close button
closeModal.addEventListener('click', () => {
    modalContainer.classList.remove('display-modal')
})

// Close modal clicking outside 
window.addEventListener('click', (e) => {
    e.target == modalContainer ? modalContainer.classList.remove('display-modal') : false
})