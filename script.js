const calculator = document.querySelector('.calculator')
const keys = calculator.querySelector('.calculator__keys')
const display = document.querySelector('.calculator__display')

// Given string operands and a string operator returns a string result
// calculate(n1: str, operator: str, n2: str): str
const calculate = function f(n1, operator, n2) {
    let result = ''
    n1 = parseFloat(n1)
    n2 = parseFloat(n2)

    switch(operator) {
        case 'add':
            result = n1 + n2
            break
        case 'subtract':
            result = n1 - n2
            break
        case 'multiply':
            result = n1 * n2
            break
        case 'divide':
            result = n1 / n2
            break
    }

    return result
}

keys.addEventListener('click', e => {
    if (e.target.matches('button')) {
        const key = e.target
        const action = key.dataset.action
        const keyContent = key.textContent
        const displayedNum = display.textContent
        const previousKeyType = calculator.dataset.previousKeyType
        
        if (!action) {
            if (displayedNum === '0') {
                display.textContent = keyContent
            }
            else {
                display.textContent = displayedNum + keyContent
            }
            calculator.dataset.previousKey = 'number'
        }

        if (action === 'decimal') {
            if (!displayedNum.includes('.')) {
                display.textContent = displayedNum + '.'
            }
            else if (previousKeyType === 'operator') {
                display.textContent = '0.'
            }
        }

        if (
            action === 'add' ||
            action === 'subtract' ||
            action === 'multiply' ||
            action === 'divide'
          ) {
            key.classList.add('is-pressed')
            calculator.dataset.previousKeyType = 'operator'
            calculator.dataset.firstValue = displayedNum
            calculator.dataset.operator = action
        }

        if (action === 'clear') {
            calculator.dataset.previousKeyType = 'clear'
        }

        if (action === 'calculate') {
            const firstValue = calculator.dataset.firstValue
            const operator = calculator.dataset.operator
            const secondValue = displayedNum
            
            display.textContent = calculate(firstValue, operator, secondValue)
            calculator.dataset.previousKeyType = 'calculate'
        }

        // Remove .is-pressed class from all keys
        Array.from(key.parentNode.children)
          .forEach(k => k.classList.remove('is-pressed'))
        
    }
})



