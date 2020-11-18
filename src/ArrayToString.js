export default function ArrayToString(array){
    return array.reduce(stringConcatenation)

}
function stringConcatenation(str1,str2){
    return str1+str2

}