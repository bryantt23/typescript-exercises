interface BmiValues {
    value1: number;
    value2: number;
}

const parseArguments = (args: Array<string>): BmiValues => {
    if (args.length < 4) throw new Error("Not enough arguments")
    if (args.length > 4) throw new Error("Too many arguments")

    if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
        return {
            value1: Number(args[2]),
            value2: Number(args[3]),
        }
    } else {
        throw new Error("Provided values were not numbers!")
    }
}


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

try {
    const { value1, value2 } = parseArguments(process.argv)
    console.log(calculateBmi(value1, value2))
}
catch (e) {
    console.log('Error, something bad happened, message: ', e.message);
}

// console.log(calculateBmi(40, 147))
// console.log(calculateBmi(63, 147))
// console.log(calculateBmi(65, 147))
