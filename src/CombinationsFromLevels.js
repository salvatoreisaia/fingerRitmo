import Levels from "./Levels"
import RandomIntsArray from "./RandomIntsArray"
/* l'output della funzione deve essere un array di combinazioni
se selected combinations è vuoto selezionale casualmente a partire dai livelli */
export default function CombinationsFromLevels(arrayOfSelectedLevels, numberOfCombination) {

    let poolOfCombinations = [];
    let arrayOfCombinations = []

    //conacatenate all the selected levels
    for (let index = 0; index < arrayOfSelectedLevels.length; index++) {
        const element = arrayOfSelectedLevels[index];

        poolOfCombinations = poolOfCombinations.concat(Levels(element))

    }
    //array of n random indexes
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
window.CombinationsFromLevels = CombinationsFromLevels

