const sexChoiceWrapper = document.querySelector('.kcal-calculator-body .sex-choice')
const submitButton = document.querySelector('.kcal-calculator-body #submit-calculator')
const errorWrapper = document.querySelector('.kcal-calculator-body .error-wrapper p')
const overlay = document.querySelector('.overlay')
const overlayMessage = document.querySelector('.overlay .message')
const modelImage = document.querySelector('.image.col img')
let chosenSex = true //true - male, false - female

sexChoiceWrapper.addEventListener('click', (e) => {
  e.target.classList.add('active')
  if (e.target.id === 'male'){
    document.querySelector('.kcal-calculator-body .sex-choice #female').classList.remove('active')
    modelImage.src = './male.png'
    document.documentElement.classList.remove('female')
    chosenSex = true
  } else{
    document.querySelector('.kcal-calculator-body .sex-choice #male').classList.remove('active')
    modelImage.src = './female.png'
    document.documentElement.classList.add('female')
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
    return stepAResult
  }
  else{
    return false
  }
}

function submitCalculator(){

  if (stepA()){
    const lifestyleSelect = document.querySelector('.kcal-calculator-body #lifestyle-select')
    const lifestyleSelectValue = lifestyleSelect.value

    const goalSelect = document.querySelector('.kcal-calculator-body #goal-select')
    const goalSelectValue = +goalSelect.value
  
    let caloriesResult = stepA () * lifestyleSelectValue

    let goal
    if (goalSelectValue === 0){
      goal = 'na utrzymanie masy'
    } else if (goalSelectValue === 1){
      goal = 'do budowania masy'
      caloriesResult+= caloriesResult * 0.15
    } else if (goalSelectValue === -1){
      goal = 'do redukowania masy'
      caloriesResult-= caloriesResult * 0.15
    }

    caloriesResult = caloriesResult.toFixed()

    overlayMessage.innerHTML = `Twoje zapotrzebowanie kaloryczne ${goal} to: <span>${caloriesResult} KCAL</span>`
    overlay.classList.add('active')

    const closeOverlay = document.querySelector('#close-overlay')
    closeOverlay.addEventListener('click', resetCalculation)
  }

}

function resetCalculation (){
  const femaleBtn = document.querySelector('.kcal-calculator-body .sex-choice #female')
  const maleBtn = document.querySelector('.kcal-calculator-body .sex-choice #male')
  allInputs = document.querySelectorAll('.inputs-data input')
  const lifestyleSelect = document.querySelector('.kcal-calculator-body #lifestyle-select')
  const goalSelect = document.querySelector('.kcal-calculator-body #goal-select')

  if(femaleBtn.classList.contains('active')){
    femaleBtn.classList.remove('active')
  }

  if(!maleBtn.classList.contains('active')){
    maleBtn.classList.add('active')
  }

  if (document.documentElement.classList.contains('female')) {
    document.documentElement.classList.remove('female')
  }

  modelImage.src = './male.png'

  lifestyleSelect.value = lifestyleSelect.querySelector('option').value
  goalSelect.value = goalSelect.querySelector('option').value

  allInputs.forEach(el => {
    el.value = ''
  })
  
  overlay.classList.remove('active')

  chosenSex = true

}

submitButton.addEventListener('click', submitCalculator)