import React, { Component, useContext } from 'react'
import { GlobalStateContext } from "./GlobalState"
import Metronome from './Metronome';
var dictionary = {
    training: "Allenamento",
    test: "Test",
    options: "Opzioni",
    stats: "Stats"
}
class NavMenu extends Component {


    constructor(props) {
        super(props);
        this.onLiClick = this.onLiClick.bind(this);

        this.selectionElement = React.createRef();
        this.initialSelectedElement = React.createRef();
        this.navList = React.createRef();
        const [globalState, setGlobalState] = props.globalState
        this.props = props
        this.globalState = globalState
        this.setGlobalState = setGlobalState
        this.state = {
            selectedTab: dictionary[this.globalState.navigation],
        };
    }

    moveSelection(destinationElement) {

        let selectionXy = { x: destinationElement.offsetLeft, y: destinationElement.offsetTop, width: destinationElement.offsetWidth, height: destinationElement.offsetHeight }
        this.setState({
            selectedTab: destinationElement.id
        });
        let selAre = this.selectionElement.current.style;
        var styles = getComputedStyle(document.documentElement);

        var padding = styles.getPropertyValue('--padding');
        padding = +padding.replace('px', '')
        selAre.setProperty('--x', (selectionXy.x - padding) + 'px')
        selAre.setProperty('--y', (selectionXy.y - padding) + 'px')
        selAre.setProperty('width', (selectionXy.width) + 'px')
        selAre.setProperty('height', (selectionXy.height) + 'px')


    }
    componentDidMount() {

        const menuElements = this.navList.current.children;
        let repositioning=()=> {
            for (let i = menuElements.length - 1; i >= 0; i--) {
                if (menuElements[i].id === this.state.selectedTab) {

                    this.moveSelection(menuElements[i].firstChild)
                    break
                }
            }

        }
        repositioning()
        
        
    }

    onLiClick(e) {
        /*this.selectionRect = useRef(null)*/
        this.moveSelection(e.target)
        //console.log(this.props.globalState[0])
        var newState = { ...this.props.globalState[0] }
        const currentNavigation = newState.navigation
        const metronomeSate = window.m.runningState
        const destination = e.target.attributes.type.value
        if (currentNavigation != destination) {
            if (window.m.runningState !== "unactive") {
                if (currentNavigation === "training" || currentNavigation === "test") {
                    if (destination === "training" || destination === "test") {
                        window.m.fermaMetronomo()
                    }
                }

            }
        }


        setTimeout(() => {

            newState = { ...this.props.globalState[0] }
            if (destination === "training" || destination === "test") {
                newState = { ...newState, mode: destination }


            }
            newState = { ...newState, navigation: destination }

            this.props.globalState[1]({ ...newState })
        }, 50)

    }



    render() {
        return (
            <div className="navMenuContainer">
                <ul className="navMenu" ref={this.navList} >
                    <li id="selectionNavArea" ref={this.selectionElement} ></li>
                    {this.props.tabs.map(tab => {
                        return (<li key={tab.name} id={tab.name} >
                            <span
                                type={tab.type}

                                onClick={(e) => this.onLiClick(e)}
                            >
                                {tab.name}
                            </span>
                        </li>)
                    })}
                </ul>
            </div>
        )


    }
}

export default NavMenu
