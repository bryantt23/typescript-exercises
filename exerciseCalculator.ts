interface ExerciseReport {
    periodLength: number,
    trainingDays: number,
    success: boolean,
    rating: number,
    ratingDescription: string,
    target: number,
    average: number
}

const calculateExercises = (actualTrainingHoursEachDay: Array<number>, target: number): ExerciseReport => {
    const periodLength = actualTrainingHoursEachDay.length
    const trainingDays = actualTrainingHoursEachDay.filter(day => day > 0).length
    const actualTrainingHoursTotal = actualTrainingHoursEachDay.reduce((acc, cur,) => acc + cur, 0)
    const totalTargetTrainingHoursTotal = target * periodLength
    const average = actualTrainingHoursTotal / periodLength
    const success = actualTrainingHoursTotal >= totalTargetTrainingHoursTotal

    let rating, ratingDescription;
    if (actualTrainingHoursTotal < totalTargetTrainingHoursTotal) {
        rating = 1;
        ratingDescription = "Can improve"
    }
    else if (actualTrainingHoursTotal < (totalTargetTrainingHoursTotal) * 1.25) {
        rating = 2;
        ratingDescription = "Good"
    }
    else {
        rating = 3
        ratingDescription = "Amazing"
    }

    return {
        periodLength,
        trainingDays,
        success,
        rating,
        ratingDescription,
        target,
        average
    }
}

const targetTrainingHoursEachDay = [0, .5, 1.5, .5, 1.5, .5, 1.5]
const targetDailyHours = 1

let actualTrainingHoursEachDay = [0, 0, 1.5, .5, 1, .5, 1.5]
console.log(calculateExercises(actualTrainingHoursEachDay, targetDailyHours))

actualTrainingHoursEachDay = [1, .5, 1.5, .5, 1.5, .5, 1.5]
console.log(calculateExercises(actualTrainingHoursEachDay, targetDailyHours))

actualTrainingHoursEachDay = [1.5, 1, 1.5, 1, 1.5, 1, 1.5]
console.log(calculateExercises(actualTrainingHoursEachDay, targetDailyHours))