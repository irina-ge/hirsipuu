const input = document.querySelector('input')
const output = document.querySelector('output')
const span = document.querySelector('span')

const words = [ 
    "programming",
    "javascript",
    "database",
    "markup",
    "framework",
    "variable",
    "stylesheet",
    "library",
    "asynchronous",
    "hypertext"
]

let randomizedWord = ''
let maskedWord = ''
let guesses = 0 // Muuttuja arvausten määrän seuraamiseen

const newGame = () => {
    const random = Math.floor(Math.random() * words.length)
    randomizedWord = words[random]
    maskedWord = '*'.repeat(randomizedWord.length)
    guesses = 0 // Nollataan arvausten määrä uuden pelin alkaessa
    span.textContent = guesses // Päivitetään arvausten määrä käyttöliitymään
    console.log(randomizedWord)
    output.innerHTML = maskedWord
}

const win = () => {
    alert(`You have guessed right, the word is ${randomizedWord}. It took you ${guesses} guesses.`)
    newGame()
}

const replaceFoundChars = (guess) => {
    let newString = maskedWord.split('')
    for (let i = 0; i < randomizedWord.length; i++) {
        const char = randomizedWord[i]
        if (char === guess) {
            newString[i] = guess // Korvataan tähtimerkit arvatuilla kirjaimilla
        }
    }
    maskedWord = newString.join('')
    output.innerHTML = maskedWord // Päivitetään sana käyttöliitymään
}

newGame()

input.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        e.preventDefault() 

        const guess = input.value.toLowerCase()
        if (guess === randomizedWord.toLowerCase()) {
            guesses++
            win()
        } else if (guess.length === 1) {
            guesses++
            replaceFoundChars(guess)
            if (maskedWord.toLowerCase() === randomizedWord.toLowerCase()) {
                win()
            }
        } else {
            alert("You guessed wrong!")
            guesses++
        }

        span.textContent = guesses
        input.value=''
    }
})

