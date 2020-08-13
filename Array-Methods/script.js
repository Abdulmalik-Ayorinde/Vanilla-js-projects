const main = document.getElementById('main')
const addUserBtn = document.getElementById('add-user')
const doubleBtn = document.getElementById('double')
const showMillionairesBtn = document.getElementById('show-millionaires')
const sortBtn = document.getElementById('sort')
const calculateWealthBtn = document.getElementById('calculate-wealth')

// Event Listeners

addUserBtn.addEventListener('click', generateRandomUser)
doubleBtn.addEventListener('click', doubleMoney)
sortBtn.addEventListener('click', sortFunds)
showMillionairesBtn.addEventListener('click', filterMillionaires)
calculateWealthBtn.addEventListener('click', calculateFunds)

let data = []

generateRandomUser()
generateRandomUser()
generateRandomUser()

// generating a Random User
async function generateRandomUser() {
	const res = await fetch(`https://randomuser.me/api`)
	const data = await res.json()

	const user = data.results[0]

	const usersDetails = {
		name: `${user.name.first} ${user.name.last}`,
		money: Math.floor(Math.random() * 1000000),
	}

	pushUserObj(usersDetails)
}

function pushUserObj(obj) {
	data.push(obj)

	domUpdate()
}

// Updating the DOM
function domUpdate(userData = data) {
	// Resetting the DOM
	main.innerHTML = '<h2><strong>Person</strong> Wealth</h2>'

	userData.forEach((item) => {
		const element = document.createElement('div')
		element.classList.add('person')
		element.innerHTML = `<strong>${item.name}</strong>${fomartMoney(
			item.money
		)}`
		main.appendChild(element)
	})
}

// Double User Money
function doubleMoney() {
	data = data.map((item) => {
		return { ...item, money: item.money * 2 }
	})

	domUpdate()
}

// Sorting user Funds
function sortFunds() {
	data = data.sort((a, b) => {
		return b.money - a.money
	})

	domUpdate()
}

function filterMillionaires(){
    data = data.filter(item => {
     return item.money >= 1000000
    })

    domUpdate()
}

function calculateFunds () {
    const funds = data.reduce((acc, item) => (acc += item.money), 0)

    const total = document.createElement('div')
    total.innerHTML = `<h3>Total Wealth: <strong>${fomartMoney(funds)}</strong></h3>`
    main.appendChild(total)
}

// Fomart number as money
function fomartMoney(number) {
	return '$' + number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')
}


