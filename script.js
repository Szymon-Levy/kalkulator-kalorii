const sexChoiceWrapper = document.querySelector('.kcal-calculator-body .sex-choice')
const submitButton = document.querySelector('.kcal-calculator-body #submit-calculator')
const errorWrapper = document.querySelector('.kcal-calculator-body .error-wrapper p')
const overlay = document.querySelector('.overlay')
let chosenSex = true //true - male, false - female

sexChoiceWrapper.addEventListener('click', (e) => {
  e.target.classList.add('active')
  if (e.target.id === 'male'){
    document.querySelector('.kcal-calculator-body .sex-choice #female').classList.remove('active')
    chosenSex = true
  } else{
    document.querySelector('.kcal-calculator-body .sex-choice #male').classList.remove('active')
    chosenSex = false
  }
})

function validateInputs (){
  allInputs = document.querySelectorAll('.inputs-data input')

  for(let i = 0; i < allInputs.length; i++){
    let val = allInputs[i].value

    if(val < 1 || !val || val === ''){

      allInputs.forEach(el => {
        let val = el.value
        if( val < 1 || !val || val === '' ){
          if(!el.classList.contains('invalid')){
            el.classList.add('invalid')
          }
        }else {
          el.classList.remove('invalid')
        }
      })

      errorWrapper.textContent = 'Błąd wprowadzonych danych (Pola obramowane na czerwono)'

      return false
    }
  }

  allInputs.forEach(el => {
    if(el.classList.contains('invalid')){
      el.classList.remove('invalid')
    }
  })

  errorWrapper.textContent = ''

  return true
}

function stepA (){
  if(validateInputs()){
    const height = document.querySelector('.inputs-data #height').value
    const weight = document.querySelector('.inputs-data #weight').value
    const age = document.querySelector('.inputs-data #age').value
    let stepAResult
    if (chosenSex){
      stepAResult = 66.5 + (13.7 * weight) + (5 * height) - (6.8 * age)
    } else{
      stepAResult = 655 + (9.6 * weight) + (1.85 * height) - (4.7 * age)
    }
    return Math.floor(stepAResult)
  }
  else{
    return false
  }
}

function submitCalculator(){

  if (stepA()){
    const lifestyleSelect = document.querySelector('.kcal-calculator-body #lifestyle-select')
    const lifestyleSelectValue = lifestyleSelect.value
  
    const caloriesResult = Math.floor(stepA () * lifestyleSelectValue )

    overlay.innerHTML = `Twoje zapotrzebowanie kaloryczne to <span>${caloriesResult} KCAL</span>`
    overlay.classList.add('active')
    console.log(caloriesResult)
  }

}

submitButton.addEventListener('click', submitCalculator)

