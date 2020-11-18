export default function GenerateCombination(length, source = []) {
    var combinationsList = []
    for (var i = 0; i < length; i++) {
        var randomNumber = Math.floor((Math.random() * 256))
        while (combinationsList.indexOf(randomNumber) > -1) {

            randomNumber = Math.floor((Math.random() * 256))

        }

        combinationsList.push(randomNumber)


    }
    function numberToCombination(base10number) {
        base10number = base10number.toString(2)

        base10number = addFigures(base10number)
        base10number = base10number.split("")
        base10number.splice(4, 0, "-")

        return base10number

    }
    function addFigures(binaryNumberString) {
        const zero = "0"
        const adding = zero.repeat(8 - binaryNumberString.length)
        return (adding + binaryNumberString)
    }


    return combinationsList.map(numberToCombination)
}