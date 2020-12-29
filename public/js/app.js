const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')
const weatherIcon = document.querySelector('#weather_icon')


weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''
    weatherIcon.src = ''

    const location = search.value
    fetch('/weather?address=' + location).then((response) => {
        response.json().then((data) => {
            if (data.error){
                messageOne.textContent = data.error

                console.log(data.error)
            } else {
                messageOne.textContent = data.location
                messageTwo.textContent = data.forcast
                weatherIcon.src = data.weatherIcon
                console.log(data.location)
                console.log(data.forcast)
            }
        })
    })
})