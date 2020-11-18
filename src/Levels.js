var level1=["I___","I_I_","I___-I___","I_I_-I___","I_I_-I_I_","I___-I_I_","____-I___","____-I_I_"]
var level2=["__I_","I__I","II__","IIII","I__I-__I_","IIII-II__","IIII-IIII","__I_-__I_","II__-II__","I___-IIII","I_I_-IIII","I_I_-I__I","IIII-I___","IIII-I_I_","____-__I_","____-I__I","____-II__","____-IIII","__I_-I__I","__I_-II__","__I_-IIII","I__I-I__I","I__I-II__","I__I-IIII","II__-__I_","II__-I__I","II__-IIII","IIII-__I_","IIII-I__I","I___-II__","I___-__I_","I___-I__I","I_I_-II__","I_I_-__I_","__I_-I___","__I_-I_I_","I__I-I___","I__I-I_I_","II__-I___","II__-I_I_"]
var level3=["___I","__II","I_II","II_I","III_","___I-__II","__II-__II","I_II-__II","I_II-I_II","II_I-__II","II_I-I_II","II_I-II_I","III_-__II","III_-I_II","III_-II_I","III_-III_","I___-__II","I___-I_II","I___-II_I","I___-III_","I_I_-__II","I_I_-I_II","I_I_-II_I","I_I_-III_","___I-I___","___I-I_I_","__II-I___","__II-I_I_","I_II-I___","I_II-I_I_","II_I-I___","II_I-I_I_","III_-I___","III_-I_I_","__I_-__II","___I-I_II","__I_-II_I","__I_-III_","I__I-___I","I__I-__II","I__I-I_II","II__-__II","II__-I_II","II__-II_I","II__-III_","IIII-__II","IIII-I_II","___I-__I_","__II-__I_","I_II-__I_","II_I-__I_","III_-__I_","____-___I","____-__II","____-I_II","____-II_I","____-III_","___I-___I","___I-I_II","___I-II_I","___I-III_","__II-I_II","__II-II_I","__II-III_","I_II-___I","I_II-II_I","I_II-III_","II_I-___I","II_I-__II","II_I-III_","III_-___I","I___-___I","I_I_-___I","__I_-___I","I__I-II_I","I__I-III_","II__-___I","IIII-___I","IIII-II_I","IIII-III_","___I-I__I","___I-II__","___I-IIII","__II-I__I","__II-II__","__II-IIII","I_II-I__I","I_II-II__","I_II-IIII","II_I-I__I","II_I-II__","II_I-IIII","III_-I__I","III_-II__","III_-IIII"]
var level4=["_I_I","_II_","_III","_I__","_I_I-_I_I","_I_I-_II_","_I_I-_III","_III-_III","I___-_I_I","I___-_III","I_I_-_I_I","I_I_-_III","I_I_-_I__","_I_I-I_I_","_III-I___","_III-I_I_","_I__-I___","__I_-_I_I","__I_-_III","I__I-_I_I","I__I-_III","II__-_I_I","II__-_II_","II__-_III","IIII-_I_I","IIII-_II_","IIII-_III","_I_I-__I_","_III-__I_","_III-II__","_III-IIII","_I__-IIII","___I-_II_","___I-_III","__II-_II_","__II-_III","I_II-_I_I","I_II-_II_","I_II-_III","II_I-_I_I","II_I-_II_","II_I-_III","III_-_III","_I_I-__II","_I_I-I_II","_I_I-II_I","_I_I-III_","_II_-__II","_II_-I_II","_III-___I","_III-__II","_III-I_II","_III-II_I","_III-III_","_I__-__II","_I__-I_II","_I__-III_","____-_I_I","____-_II_","____-_III","____-_I__","_I_I-_I__","_II_-_I_I","_II_-_II_","_II_-_III","_II_-_I__","_III-_I_I","_III-_II_","_III-_I__","_I__-_I_I","_I__-_II_","_I__-_III","_I__-_I__","I___-_II_","I___-_I__","I_I_-_II_","_I_I-I___","_II_-I___","_II_-I_I_","_I__-I_I_","__I_-_II_","__I_-_I__","I__I-_II_","I__I-_I__","II__-_I__","IIII-_I__","_I_I-I__I","_I_I-II__","_I_I-IIII","_II_-__I_","_II_-I__I","_II_-II__","_II_-IIII","_III-I__I","_I__-__I_","_I__-I__I","_I__-II__","___I-_I_I","___I-_I__","__II-_I_I","__II-_I__","I_II-_I__","II_I-_I__","III_-_I_I","III_-_II_","III_-_I__","_I_I-___I","_II_-___I","_II_-II_I","_II_-III_","_I__-___I","_I__-II_I"]
export default function Levels(levelNumber){
    switch (levelNumber) {
        case 1:
            return level1
            break;
        case 2:
            return level2
          break;
        case 3:
            return level3
          break;
        case 4:
           return level4
          break;
          default:
            console.error("input data invalid")
       
      }
}
window.level=Levels