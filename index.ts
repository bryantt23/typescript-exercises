import calculateBmi from "./bmiCalculator";
import calculateExercises from "./exerciseCalculator";


const express = require('express')
const app = express()
// https://stackoverflow.com/questions/9177049/express-js-req-body-undefined
app.use(express.json());

app.get('/hello', (_req: any, res: { send: (arg0: string) => void }) => {
    res.send('Hello full stack!')
})
// https://stackoverflow.com/questions/175739/built-in-way-in-javascript-to-check-if-a-string-is-a-valid-number
// https://stackoverflow.com/questions/34738799/argument-of-type-x-is-not-assignable-to-parameter-of-type-x
function isNumeric(str: string) {
    if (typeof str != "string") return false // we only process strings!  
    return !isNaN(Number(str)) && // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
        !isNaN(parseFloat(str)) // ...and ensure strings of whitespace fail
}

app.get('/bmi', (req: any, res: { send: (arg0: string) => void }) => {
    try {
        const weight = req.query.weight
        const height = req.query.height
        console.log(height, weight)
        if (!isNumeric(weight) || !isNumeric(height)) {
            throw new Error("Bad argument")
        }
        const bmi = calculateBmi(weight, height)
        res.send(JSON.stringify({ weight, height, bmi }))

    } catch (error) {
        console.log("error", error)
        console.log("error", JSON.stringify(error))
        // https://stackoverflow.com/questions/57231495/nodejs-typescript-errorhandler-typing
        return res.send(JSON.stringify({ error: error.message }))
    }

})

app.post('/exercises', async (req: any, res: { send: (arg0: string) => void }) => {
    try {
        const { daily_exercises, target } = req.body
        if (daily_exercises === undefined || target === undefined) {
            throw new Error("parameters missing")
        }
        if (!Array.isArray(daily_exercises) || !isNumeric(target)) {
            throw new Error("malformatted parameters")
        }
        const exerciseResult = calculateExercises(target, daily_exercises)
        console.log(daily_exercises, target)
        res.send(JSON.stringify(exerciseResult))

    } catch (error) {
        console.log("error", error)
        console.log("error", JSON.stringify(error))
        return res.send(JSON.stringify({ error: error.message }))
    }
})


const PORT = 3002

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})