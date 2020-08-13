const currencyOne = document.getElementById("currency-one")
const currencyTwo = document.getElementById("currency-two")
const swapBtn = document.getElementById("swap-btn")
const rateField = document.getElementById("rate")
const fstNum = document.getElementById("num")
const scndNum = document.getElementById("num2")

currencyOne.addEventListener("change", calculate)
currencyTwo.addEventListener("change", calculate)
fstNum.addEventListener("input", calculate)
scndNum.addEventListener("input", calculate)
swapBtn.addEventListener("click", swaping)

function calculate() {
  const currency_one = currencyOne.value
  const currency_two = currencyTwo.value

  fetch(`https://api.exchangerate-api.com/v4/latest/${currency_one}`)
    .then((resp) => resp.json())
    .then((data) => {
      const rate = data.rates[currency_two]
      rateField.innerText = `1 ${currency_one} = ${rate} ${currency_two}`
      console.log(rate)
      scndNum.value = (fstNum.value * rate).toFixed(2)
    })
}

function swaping() {
  const swap = currencyOne.value
  currencyOne.value = currencyTwo.value
  currencyTwo.value = swap

  calculate()
}

// https://open.exchangerate-api.com/v6/latest/usd
calculate()
