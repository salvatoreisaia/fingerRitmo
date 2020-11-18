import React from 'react';
import SlideNavigation from "./SlideNavigation"
import {GlobalStateProvider }from "./GlobalState"

class App extends React.Component {
  render() {
    return (
      <div id="all">
      <GlobalStateProvider>
      <SlideNavigation tabs={[
        {name:'Allenamento',type:"training"},
        {name:'Test',type:"test"},
        {name:'Opzioni',type:"options"},
        {name:'Stats',type:"stats"}]} ></SlideNavigation>
      </GlobalStateProvider>
      </div>
    )
  }
}


 
  
  


export default App;
