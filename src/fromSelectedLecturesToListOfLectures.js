import Levels from "./Levels"

export default function fromSelectedLecturesToListOfLectures(selectedLecturesObjectOfObjects) {
    
    var listOfLectures=[]
    var listOfLevels=Object.keys(selectedLecturesObjectOfObjects)
    listOfLevels.map((levelNumber)=>{
        let completeLevel=Levels(parseInt(levelNumber))
        let selected=selectedLecturesObjectOfObjects[levelNumber]
        for (let i = 0; i < selected.length; i++) {
            const element = selected[i];
            if (completeLevel[element]!=undefined) {
                listOfLectures.push(completeLevel[element])  
            }
            
        }

    }
        
    )
    //console.log(listOfLectures)
    return listOfLectures
}
window.fromSelectedLecturesToListOfLectures=fromSelectedLecturesToListOfLectures


