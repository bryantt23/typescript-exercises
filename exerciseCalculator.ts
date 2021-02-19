interface ExerciseReport {
    periodLength: number;
    trainingDays: number;
    success: boolean;
    rating: number;
    ratingDescription: string;
    target: number;
    average: number;
}

interface ExerciseValues {
    actualTrainingHoursEachDay: Array<number>;
    target: number;
}

const parseArguments = (args: Array<string>): ExerciseValues => {
    // const n: number = args.length;
    return {
        actualTrainingHoursEachDay: args.map(num => Number(num)).slice(3),
        target: Number(args[2])
    };

    // if (args.length < 4) throw new Error("Not enough arguments")
    // if (args.length > 4) throw new Error("Too many arguments")

    // if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    //     return {
    //         value1: Number(args[2]),
    //         value2: Number(args[3]),
    //     }
    // } else {
    //     throw new Error("Provided values were not numbers!")
    // }
};

const calculateExercises = (
    target: number,
    actualTrainingHoursEachDay: Array<number>
): ExerciseReport => {
    console.log('actualTrainingHoursEachDay:', actualTrainingHoursEachDay);
    console.log('target:', target);
    const periodLength = actualTrainingHoursEachDay.length;
    const trainingDays = actualTrainingHoursEachDay.filter(day => day > 0).length;
    const actualTrainingHoursTotal = actualTrainingHoursEachDay.reduce(
        (acc, cur) => acc + cur,
        0
    );
    const totalTargetTrainingHoursTotal = target * periodLength;
    const average = actualTrainingHoursTotal / periodLength;
    const success = actualTrainingHoursTotal >= totalTargetTrainingHoursTotal;

    let rating, ratingDescription;
    if (actualTrainingHoursTotal < totalTargetTrainingHoursTotal) {
        rating = 1;
        ratingDescription = 'Can improve';
    } else if (actualTrainingHoursTotal < totalTargetTrainingHoursTotal * 1.25) {
        rating = 2;
        ratingDescription = 'Good';
    } else {
        rating = 3;
        ratingDescription = 'Amazing';
    }

    return {
        periodLength,
        trainingDays,
        success,
        rating,
        ratingDescription,
        target,
        average
    };
};

try {
    const { actualTrainingHoursEachDay, target } = parseArguments(process.argv);
    console.log(calculateExercises(target, actualTrainingHoursEachDay));
} catch (e) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    console.log('Error, something bad happened, message: ', e.message);
}
/*
const targetTrainingHoursEachDay = [0, .5, 1.5, .5, 1.5, .5, 1.5]
const targetDailyHours = 1

let actualTrainingHoursEachDay = [0, 0, 1.5, .5, 1, .5, 1.5]
console.log(calculateExercises(targetDailyHours, actualTrainingHoursEachDay))

actualTrainingHoursEachDay = [1, .5, 1.5, .5, 1.5, .5, 1.5]
console.log(calculateExercises(targetDailyHours, actualTrainingHoursEachDay))

actualTrainingHoursEachDay = [1.5, 1, 1.5, 1, 1.5, 1, 1.5]
console.log(calculateExercises(targetDailyHours, actualTrainingHoursEachDay))
*/

export default calculateExercises