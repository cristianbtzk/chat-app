var socket = io();
    var nickname
    var messages = document.getElementById('messages');
    const nicknameForm = document.getElementById('nickname-form')
    const nicknameInput = document.getElementById('nick')
    const form = document.getElementById('form')
    const input = document.getElementById('input')
    const isTypingParagraph = document.getElementById('is-typing')

    input.onkeyup = (() => {
      console.log('up');
      socket.emit('isTyping', nickname)
    })

    nicknameForm.addEventListener('submit', (e) => {
      e.preventDefault()
      if (nicknameInput.value) {
        nickname = nicknameInput.value
        nicknameForm.style.display = "none"
        form.style.display = "block"
        messages.style.display = "block"
      }
    })

    form.addEventListener('submit', (e) => {
      e.preventDefault()
      if (input.value) {
        socket.emit('message', input.value)
        const item = document.createElement('li')
        item.textContent = input.value
        messages.appendChild(item)
        input.value = ''

      }
    })

    socket.on('message', (msg) => {
      const item = document.createElement('li')
      item.textContent = msg
      messages.appendChild(item)
      window.scrollTo(0, document.body.scrollHeight)
    })

    socket.on('isTyping', (msg) => {
      isTypingParagraph.textContent = msg

      setTimeout(() => {
        isTypingParagraph.textContent = ''
      }, 3000)
    })