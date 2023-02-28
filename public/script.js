var socket = io();
var moment = moment()
var nickname
var messages = document.getElementById('messages');
const nicknameForm = document.getElementById('nickname-form')
const nicknameInput = document.getElementById('nick')
const form = document.getElementById('form')
const input = document.getElementById('input')
const isTypingParagraph = document.getElementById('is-typing')

moment.locale('pt-br')



input.onkeyup = (() => {
  socket.emit('isTyping', nickname)
})

nicknameForm.addEventListener('submit', (e) => {
  e.preventDefault()
  if (nicknameInput.value) {
    nickname = nicknameInput.value
    nicknameForm.style.display = "none"
    form.style.display = "block"
    messages.style.display = "block"
    socket.emit('joined', nicknameInput.value)
  }
})

form.addEventListener('submit', (e) => {
  e.preventDefault()
  if (input.value) {

    let msg = { msg: input.value, nickname, date: moment.calendar(new Date()) }

    socket.emit('message', msg)

    const item = document.createElement('div')
    item.style.display = "flex"
    item.style.justifyContent = "flex-end"

    item.innerHTML = componentMessage2(msg)

    messages.appendChild(item)
    input.value = ''
  }
})

socket.on('message', (msg) => {
  let messageBox = document.createElement('div')
  messageBox.classList.add('messageBox')

  messageBox.innerHTML = componentMessage(msg)

  messages.appendChild(messageBox)
  window.scrollTo(0, document.body.scrollHeight)
})

socket.on('isTyping', (msg) => {
  isTypingParagraph.textContent = msg

  setTimeout(() => {
    isTypingParagraph.textContent = ''
  }, 3000)
})

socket.on('joined', (users) => {
  const usersOn = document.getElementById('usersOn')
  usersOn.innerHTML = ''
  users.forEach(element => {
    let item = document.createElement('li')
    item.textContent = element
    
    usersOn.appendChild(item)
  });
})


function componentMessage(objMsg) {
  return `
  <div class="nicknameBox">
    <span>${objMsg.nickname}</span>
  </div>
  <div class="arrow"></div>
  <div class="messageFrom">
    <span>${objMsg.msg}</span>
    <span>${objMsg.date}</span>
  </div>`
}

function componentMessage2(objMsg) {
  return `
  <div class="messageTo">
    <span>${objMsg.msg}</span>
    <span>${objMsg.date}</span>
    </div>`
}