console.log('js-publick file loaded')

// fetch(`http://localhost:3001/weather?address=${search.value}`).then(response => {
//   response.json().then(data => {
//     if (data.error) {
//       console.log(data.error)
//     } else {
//       console.log(data.location)
//       console.log(data.forecast)
//     }
//   })
// })

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

weatherForm.addEventListener('submit', e => {
  e.preventDefault()
  console.log('Form submited searching fore: ', search.value)

  messageOne.textContent = 'Loading...'
  messageTwo.textContent = ''

  fetch(`http://localhost:3001/weather?address=${search.value}`).then(
    response => {
      response.json().then(data => {
        if (data.error) {
          messageOne.textContent = data.error
        } else {
          messageOne.textContent = data.location
          messageTwo.textContent = data.forecast
        }
      })
    }
  )
})
