console.log("number 1")
// start no 1
const nim: string = "056111398"

function printNumberTriagle(nim: string) : void {
  const height: number = Number(nim[nim.length -1])

  if (!Number.isInteger(height) || height < 1) {
    throw new Error("Digit Terakhir NIM tidak valid")
  }

  for (let row:number = 1; row <= height; row++) {   
    const numbers: number[] = []

    for (let column = 1; column <= row ; column++) {
      numbers.push(column)
    }

    console.log(numbers.join(" "))
  }
}

printNumberTriagle(nim)

// start no 2
console.log("number 2")
function generateArithmaticSequence(nim: string): number[] {
  const start: number = Number(nim.slice(-2))
  const thridFromLast: number = Number(nim[nim.length -3])
  const step: number = thridFromLast + 1
  
  const sequence : number[] = []

  for (let index: number = 0; index < 10; index++) {
    const term: number= start + index * step;
    sequence.push(term)
  }

  return sequence
}

const sequence: number[] = generateArithmaticSequence(nim)
console.log(sequence.join(","))

// start no 3
console.log("number 3")
function isPrime( number: number) : boolean {
  if(number < 2){
    return false
  }
  for (let divisor: number = 2; divisor * divisor <= number; divisor++) {
    if(number % divisor === 0 )
    return false
  }

  return true
}

function genereatePrimes(nim:string): number[] {
  const lastTwoDigits: number = Number(nim.slice(-2))
  const limit: number= lastTwoDigits + 10
  
  const primes: number[] = []

  for (let number = 2; number <= limit; number++) {
    if(isPrime(number)){
      primes.push(number)
    }
  }
  return primes
}

const primes : number[] = genereatePrimes(nim)
console.log(primes.join(",")) 