let countries = {}
let main = document.querySelector('#countries')
let countrySearch = document.querySelector('#countrySearch')

function createCountryCard(country) {
  const card = document.createElement('div')
  card.classList.add('country')

  const countryName = country.name.common
  const conutryFlagSvg = country.flags.svg

  const name = document.createElement('h2')
  name.textContent = countryName

  const flag = document.createElement('img')
  flag.src = conutryFlagSvg

  card.append(...[name, flag])
  main.append(card)
}

async function getCountries() {
  const response = await fetch('https://restcountries.com/v3.1/all')
  countries = await response.json()

  addNewCountries(countries)
}

getCountries()

countrySearch.addEventListener('keyup', searchCountries)

function searchCountries() {
  const palavra = this.value.trimEnd().toLowerCase()
  main.innerHTML = ''

  if (palavra == '') {
    addNewCountries(countries)
  } else {
    countries.forEach((country) => {
      countryName = country.name.common.toLowerCase()
      if (countryName.startsWith(palavra)) {
        createCountryCard(country)
      }
    })
  }
}

function addNewCountries(array) {
  array.forEach((country) => {
    createCountryCard(country)
  })
}
