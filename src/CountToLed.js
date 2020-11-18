export default function countToLed(count) {
    var ledNumber=3-((Math.ceil(count/4)*4)-count)
    return ledNumber
}
window.countToLed=countToLed


