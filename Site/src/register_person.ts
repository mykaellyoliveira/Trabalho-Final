import Person, { Plan } from './entities/Register.js'
import {Gender} from './entities/Register.js'
import {City} from './entities/Register.js'

const name = document.querySelector<HTMLInputElement>('#name')!
const email = document.querySelector<HTMLInputElement>('#email')!
const telephone = document.querySelector<HTMLInputElement>('#telephone')!
const gender = document.querySelector<HTMLSelectElement>('#gender')!
const citys = document.querySelector<HTMLSelectElement>('#citys')!
const plan = document.querySelector<HTMLSelectElement>('#plans')!
const objective = document.querySelector<HTMLSelectElement>('#objective')!
const message = document.querySelector<HTMLParagraphElement>('#message')!
const recom = document.querySelector<HTMLParagraphElement>('#recom')!
const form = document.querySelector('form')!

var plano = getParameterByName('plano', window.location.href);

if (plano == "b"){
  plan.value = "b"
}
else if(plano == "m"){
  plan.value ="m"
}
else if(plano == "a"){
  plan.value ="a"
}

objective.addEventListener('change', (e: Event)=>{
  e.preventDefault()
  if(objective.value == 'g'){
    recom.style.display = "block"
    plan.value = 'b'
  }
  else if(objective.value == 'm'){
    recom.style.display = "block"
    plan.value = 'm'
  }
  else if(objective.value == 'p') {
    recom.style.display = "block"
    plan.value = 'a'
  }
  else{
    recom.style.display = "none"
    plan.value =''
  }
})

plan.addEventListener('change', (event) =>{
  if (plan.value == 's'){
    window.location.href = "index.html#planos";
  }
})

const persons: Person[] = []
showPersons()
name.focus()

form.addEventListener('submit', (e: Event) => {
    e.preventDefault()
    
    const valueName = name.value.trim()

    if (!valueName) {
        message.innerText = 'O campo Nome é obrigatório!'
        name.focus()
        return
    }

    const regexName = /\w+\s\w+/g
    
    if (!regexName.test!(valueName)) {
        message.innerText = 'Informe seu nome completo!'
        name.focus()
        return
      }
    
      if (!email.value) {
        message.innerText = 'O campo E-mail é obrigatório!'
        email.focus()
        return
      }

      const regexEmail = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g
    
      if (!regexEmail.test(email.value)) {
        message.innerText = 'Formato de E-mail inválido!'
        email.focus()
        return
      }
      
      if(!telephone.value){
        message.innerText = 'O campo telefone é obrigatório'
        telefone.focus()
        return
      }

      if(!gender.value){
        message.innerText = 'Selecione um gênero!'
        gender.focus()
        return
      }

      if(!citys.value){
        message.innerText = 'Selecione uma cidade!'
        citys.focus()
        return
      }

      if(!plan.value){
        message.innerText = 'Selecione um plano!'
        plan.focus()
        return
      }

      try{
        var dNow = new Date();
        var localdate =  dNow.getFullYear() + '-' + (dNow.getMonth()+1) + '-' +  dNow.getDate() + 'T00:00:00';
        console.log (localdate)
        const person = new Person(
          name.value, 
          email.value, 
          telephone.value,  
          gender.value === 'f' ? Gender.Female : Gender.Male, 
          citys.value === 's' ? City.Sarandi : City.Maringa,
          plan.value === 'b' ? Plan.Básico : plan.value === 'm' ? Plan.Médio : Plan.Avançado,
          new Date(localdate)
        )            
        console.log(localdate)
        persons.push(person)

        localStorage.setItem('persons', JSON.stringify(persons))
        showPersons()
        message.innerText = name.value + " cadastrado(a) com sucesso!"

      }
      catch(error:any){
        console.log(error)
        message.innerText = "Opa, deu erro!"
      }

      name.value=""
      email.value=""
      telephone.value=""
      gender.value=""
      citys.value=""
      plan.value= ""      
})

function showPersons() {
  if (localStorage.getItem('persons')) {
    const data = JSON.parse(localStorage.getItem('persons')!)

    persons.splice(0)

    for (const item of data) {
      persons.push(new Person(
        item.name,
        item.email,
        item.telephone,
        item.gender,
        item.city,
        item.plan,
        item.date
      ))
    }
  }
}

// função pegar var da url para select de planos
function getParameterByName(name: string, url: string | undefined) {
  if (!url) url = window.location.href;
  url = url.toLowerCase(); // correcao em caso de case sensitive
  name = name.replace(/[\[\]]/g, "\\$&").toLowerCase();// correcao em caso de case sensitive
  var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
      results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return '';
  return decodeURIComponent(results[2].replace(/\+/g, " "));
}