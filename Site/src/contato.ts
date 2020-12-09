const nome = document.querySelector<HTMLInputElement>('#nome')!
const email = document.querySelector<HTMLInputElement>('#email')!
const telefone = document.querySelector<HTMLInputElement>('#telephone')!
const mensagem = document.querySelector<HTMLInputElement>('#mensagem')!
const msg = document.querySelector<HTMLInputElement>('#message')!
function validar (){
    const valueName = nome.value.trim()

    if (!valueName) {
        msg.innerText = 'O campo Nome é obrigatório!'
        nome.focus()
        return false;
    }

    const regexName = /\w+\s\w+/g
    
    if (!regexName.test!(valueName)) {
        msg.innerText = 'Informe seu nome completo!'
        nome.focus()
        return false;
      }
    
      if (!email.value) {
        msg.innerText = 'O campo E-mail é obrigatório!'
        email.focus()
        return false;
      }

      const regexEmail = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g
    
      if (!regexEmail.test(email.value)) {
        msg.innerText = 'Formato de E-mail inválido!'
        email.focus()
        return false;
      }
      
      if(!telefone.value){
        msg.innerText = 'O campo telefone é obrigatório'
        telefone.focus()
        return false;
      }

      if(!mensagem.value) {
        msg.innerText = 'O campo mensagem é obrigatório'
        mensagem.focus()
        return false;
      } 
    
      nome.value = ""
      email.value = ""
      telefone.value=""
      mensagem.value = ""
}
