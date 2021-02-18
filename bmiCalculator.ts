
const calculateBmi = (weight: number, height: number): string => {
    const heightCm = height * .01
    const bmi = weight / (heightCm * heightCm)
    if (bmi < 25) {
        return "Normal weight"
    }
    else if (bmi < 30) {
        return "Overweight"
    }
    else {
        return "Obese"
    }
}


console.log(calculateBmi(40, 147))
console.log(calculateBmi(54, 147))
console.log(calculateBmi(65, 147))
