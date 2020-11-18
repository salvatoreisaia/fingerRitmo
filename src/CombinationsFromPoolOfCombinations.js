import RandomIntsArray from "./RandomIntsArray";
export default function CombinationsFromPoolOfCombinations(poolOfCombinations, numberOfCombination) {

    
    let arrayOfCombinations = []

    
    let indexesOfCombinations = RandomIntsArray(0, poolOfCombinations.length, numberOfCombination)
    //choose n random combinations from the pool
    for (let index = 0; index < indexesOfCombinations.length; index++) {
        const element = poolOfCombinations[indexesOfCombinations[index]];
        arrayOfCombinations.push(element)

    }
    
    for (let index = 0; index < arrayOfCombinations.length; index++) {
        arrayOfCombinations[index]=arrayOfCombinations[index].replace(/I/g, "1")
        arrayOfCombinations[index]=arrayOfCombinations[index].replace(/_/g, "0") 
        arrayOfCombinations[index]=arrayOfCombinations[index].split('')      
    }
    return arrayOfCombinations


    

    //se selectecombination è vuoto seleziona casualmente il numero di combinazioni indicato in argomento  altrimenti scegli dalle combinazioni selezionate
}