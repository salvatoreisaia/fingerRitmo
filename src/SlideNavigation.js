import React, { useContext } from "react"
import { GlobalStateContext } from "./GlobalState"
 import ContentTabs from './ContentTabs'
 import NavMenu from "./NavMenu"
 
 export default function SlideNavigation({tabs}) {
    
     return (
     <>
         <NavMenu tabs={tabs} globalState={useContext(GlobalStateContext)}/>
        <ContentTabs/>   
             
         
         </>
     )
 }
 