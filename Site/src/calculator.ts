import Calculator from './entities/Calculator.js'

const height = document.querySelector<HTMLInputElement>('#altura')!
const weight = document.querySelector<HTMLInputElement>('#peso')!
const message = document.querySelector<HTMLParagraphElement>("#message")!
const form = document.querySelector('form')!

form.addEventListener('submit', (e: Event)=>
{
    e.preventDefault()

    if(!height.value.trim()){
        message.innerText = "O campo altura é obrigatório"
        height.focus()
        return
    }

    if(isNaN(parseFloat(height.value))){
        message.innerText = "Digite somente números no campo altura"
        height.focus()
        return
    }

    if(!weight.value.trim()){
        message.innerText = "O campo peso é obrigatório"
        weight.focus()
        return
    }

    if(isNaN(parseFloat(weight.value))){
        message.innerText = "Digite somente números no campo peso"
        weight.focus()
        return
    }

    let height1 = parseFloat(height.value)
    let weight1 = parseFloat(weight.value)

    console.log(height1)
    let imc = weight1 / (height1 * height1);

    let result = imc.toFixed(1)

    if(parseFloat(result) < 18.5){
        message.innerText = "O seu índice de massa corporal é de: " + result + " você está na classificação: magreza."
    }
    else if (parseFloat(result) > 18.5 && parseFloat(result) < 24.9){
        message.innerText = "O seu índice de massa corporal é de: " + result + " você está na classificação: saudável."
    }
    else if (parseFloat(result) > 25.0 && parseFloat(result) < 29.9){
        message.innerText = "O seu índice de massa corporal é de: " + result + " você está na classificação: sobreweight."
    }
    else if (parseFloat(result) > 30.0 && parseFloat(result) < 34.9){
        message.innerText = "O seu índice de massa corporal é de: " + result + " você está na classificação: Obesidade Grau I (leve)."
    }
    else if (parseFloat(result) > 40.0 && parseFloat(result) < 49.9){
        message.innerText = "O seu índice de massa corporal é de: " + result + " você está na classificação: Obesidade Grau II (severa)."
    }
    else if (parseFloat(result) > 50.0 && parseFloat(result) < 59.9){
        message.innerText = "O seu índice de massa corporal é de: " + result + " você está na classificação: Obesidade Grau III (mórbida)"
    }
    else if (parseFloat(result) > 60.0){
        message.innerText = "O seu índice de massa corporal é de: " + result + " você está na classificação: Hiper Obeso."
    }
    
    weight.value ='';
    height.value = '';

})

weight.value ='';
height.value = '';
