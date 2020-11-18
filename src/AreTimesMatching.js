export default function AreTimesMatching(array1, array2, deltaMax) {
   
    if (array1.length !== array2.length) {
        return false

    } else {
        let index = 0;
        while (index <= array1.length) {
            if (Math.abs(array1[index] - array2[index]) > deltaMax) {
                return false
            }
            index++

        }
        return true

    }
}
window.AreTimesMatching=AreTimesMatching