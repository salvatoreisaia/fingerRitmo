/*developer note:
due to memory allocation problems, the drum hits array is stored in an array of array called listOfDumHits
in order to create a new array in listOfDrumHits at the end o

*/
import React, { Component } from 'react';

import CombinationsFromLevels from "./CombinationsFromLevels";
import IntervalCalculatorFromBpm from "./IntervalCalculatorFromBpm";
import HandleVisibilityChange from './HandleVIsibilityChange';
import RhythmManager from "./RhythmManager";
import AreTimeMatching from "./AreTimesMatching";
import fromSelectedLecturesToListOfLectures from './fromSelectedLecturesToListOfLectures';
import CombinationsFromPoolOfCombinations from './CombinationsFromPoolOfCombinations';

class Metronome extends Component {
    constructor(props) {
        super(props)

        this.isActive = false
        this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
        this.ticCounterInitialValue = -1
        this._sixteenthCounter = this.ticCounterInitialValue
        this.metronomeTic = this.ticCounterInitialValue
        this.correctHitsList = []
        this.intervallo = IntervalCalculatorFromBpm(props.bpm)
        this.step = 0
        this.quarterForAnimation = 4;
        this.contatorePallino = 0
        this.listOfTimes = [];
        this.listOfDrumHits = [[]]
        this.props = props
        this.ledCounter = 0
        this.realQuarter = 0
        this.globalState = props.globalState
        window.globalState = this.globalState
        this.setGlobalState = props.setGlobalState
        const [ledSettings, setLedSettings] = props.props.ledController;
        this.ledSettings = ledSettings;
        this.setLedSettings = setLedSettings;
        this.runningState = "unactive"
        window.m = this
        this.handleVisibilityChange = new HandleVisibilityChange()

        this.rhythmManager = new RhythmManager(
            props.bpm,
            this.props.metronomeType,
            this.globalState.combinationsList,
            this.setLedSettings,
            this);
        window.r = this.rhythmManager
    }

    componentDidMount() {

        this.handleVisibilityChange.init()





    }
    componentDidUpdate() {

        this.intervallo = IntervalCalculatorFromBpm(this.props.bpm)
        this.rhythmManager.metronomeType = this.props.metronomeType
        this.rhythmManager.bpm = this.props.bpm
        if (this.rhythmManager.helpSound !== this.props.globalState.helpSound) {
            this.rhythmManager.helpSound = this.props.globalState.helpSound
        }
        if (this.rhythmManager.configurations !== this.props.globalState.combinationsList) {
            this.rhythmManager.configurations = this.props.globalState.combinationsList
        }








    }
    now() {
        return this.audioContext.currentTime
    }
    forEveryUpdate() {


    }


    set sixteenthCounter(x) {
        //console.log("set 16th counter",x)
        this._sixteenthCounter = x
        //this.setGlobalState({ ...this.props.globalState, sixteenthCounter: x })
        let progress = x / this.props.globalState.total16ths * 100
        if (progress >= 0) {
            progress = progress + "%"

        } else {
            progress = "0%"
        }
        document.documentElement.style.setProperty('--progress', progress);





    }
    get sixteenthCounter() {
        return this._sixteenthCounter//this.props.globalState.sixteenthCounter
    }




    nextConfiguration(beginningNextConfiguration, isCorrect) {

        var combinationsListLength = this.props.globalState.combinationsList.length

        var total16th = this.props.globalState.total16ths
        var isPaused = this.runningState === "paused" ? true : false

        if (this.props.combinationIndex < combinationsListLength - 1 && this.runningState !== "unactive") {
            if (this.sixteenthCounter < total16th - 2) {
                //patch for metroneme in transition
                this.stopTransitionSounds()
                console.log("stop transitions sounds")
                //end of patch
                console.log("avanzamento precoce")

                this.recordOutcomeInGlobalStorage(true)
            }
            var currentConfigurationsIndex = this.props.globalState.combinationIndex


            this.rhythmManager.stop(currentConfigurationsIndex)
            console.log("rm stop")
            this.sixteenthCounter = 0;
            this.props.setGlobalState({ ...this.props.globalState, heandClass: "heandsWrapper", sixteenthCounter: 0, combinationIndex: currentConfigurationsIndex + 1 })
            if (!isPaused) {
                setTimeout(() => {
                    this.rhythmManager.start(0, this.props.globalState.combinationIndex, beginningNextConfiguration, isCorrect)
                }, 0)
            }

        } else {
            console.error("you reached the end of list of configurations, or the metronome is unactive, you can not go to the next configuration")
        }


    }
    drumTouch() {
        // this.rhythmManager.drumSoundPlay()
        var now = this.rhythmManager.now()

        if (this.runningState === "active") {
            let currentConfigurationsIndex = this.props.globalState.combinationIndex
            this.listOfDrumHits[currentConfigurationsIndex].push(now)
            this.setGlobalState({ ...this.props.globalState, isDrumActive: true })
        }
    }

    drumScore() {

        let firstHitMoment = this.rhythmManager.soundMomentsArray[this.props.globalState.sixteenthOfBeginningExecution]
        let currentConfigurationsIndex = this.props.globalState.combinationIndex
        let currentConfiguration = this.props.globalState.combinationsList[currentConfigurationsIndex].slice()
        this.correctHitsList = []
        if (this.listOfDrumHits.length <= currentConfigurationsIndex) {
            this.listOfDrumHits[currentConfigurationsIndex] = []
        }
        if (currentConfiguration.length > 4) { currentConfiguration.splice(4, 1) };
        currentConfiguration.map(
            (currentValue, index) => {
                let hitTime = currentValue === "1" ? firstHitMoment + (this.intervallo * index) : undefined;
                if (hitTime !== undefined) { this.correctHitsList.push(hitTime) }
                return 0

            })

        this.isCorrect = AreTimeMatching(this.listOfDrumHits[currentConfigurationsIndex], this.correctHitsList, parseFloat(this.props.globalState.standardError))

        this.recordOutcomeInGlobalStorage(false)
        if (this.props.globalState["isDrumActive"] || this.props.globalState["mode"] === "test") {
            if (this.isCorrect) {
                document.documentElement.style.setProperty('--feedbackColor', "green");
            } else {
                document.documentElement.style.setProperty('--feedbackColor', "red");
            }
            this.setGlobalState({ ...this.props.globalState, feedbackClass: "feedbackBoxOn" })
            setTimeout(() => {
                this.setGlobalState({ ...this.props.globalState, feedbackClass: "" })

            }, 1000)
            this.setGlobalState({ ...this.props.globalState, isDrumActive: false })
            //console.log(this.props.globalState.currentOutcome)

        }
        return this.isCorrect
    }
    recordOutcomeInGlobalStorage(earlyAdvancement) {
        let currentConfigurationsIndex = this.props.globalState.combinationIndex
        var listOfDrumHits = this.listOfDrumHits[currentConfigurationsIndex].slice()
        var combinationIndex = this.props.globalState.combinationIndex
        var outcome = this.props.globalState.currentOutcome
        var configuration = this.props.globalState.combinationsList[combinationIndex]

        outcome.outcome[combinationIndex] = {
            configuration: configuration,
            isCorrect: this.isCorrect,
            idealTimes: this.correctHitsList.slice(),
            actualTimes: listOfDrumHits.slice(),
            isDrumActive: listOfDrumHits.length > 0 ? true : false,
            earlyAdvancement: earlyAdvancement
        }
        //console.log("hits list", listOfDrumHits, "correct hit list: ", this.correctHitsList, "outcome variable", outcome)
        this.setGlobalState({ ...this.props.globalState, currentOutcome: outcome })
        this.listOfDrumHits[currentConfigurationsIndex + 1] = []

    }
    saveOutcome() {
        if (this.props.globalState.mode === "test") {
            localStorage.setItem(this.props.globalState.currentOutcome.beginningMoment, JSON.stringify(this.props.globalState.currentOutcome));
        }

    }
    previousConfigurationDownClick() {
        console.log("down click", Date.now())
        this.downClickMoment = Date.now()

    }
    previousConfigurationUpClick() {
        console.log("up click")
        this.upClickMoment = Date.now()
        if (this.upClickMoment - this.downClickMoment > 300) {
            this.previousConfiguration()
        } else {
            this.restartConfiguration()
        }
    }
    previousConfiguration() {
        this.step = this.props.globalState.combinationIndex > 0 ? 1 : 0
        this.backConfiguration();
    }
    restartConfiguration() {
        this.step = 0
        this.backConfiguration();
        console.log("restart config")
    }
    stopTransitionSounds() {
        for (let index = 0; index < this.rhythmManager.transitionSoundsArray.length; index++) {
            try {
                console.log("stop transition sounds function", index, this.rhythmManager.transitionSoundsArray[index])
                console.log(this.rhythmManager.transitionSoundsArray[index].playbackState)
                if (this.rhythmManager.transitionSoundsArray[index].playbackState === undefined || this.rhythmManager.transitionSoundsArray[index].playbackState === 1) {
                    this.rhythmManager.transitionSoundsArray[index].stop()
                }


            } catch (error) {
                console.error("stop transition sounds function", error, index, this.rhythmManager.transitionSoundsArray[index])

            }
        }
    }
    backConfiguration() {
        var localGlobalState = this.props.globalState
        var isPaused = this.runningState === "paused" ? true : false
        if (this.runningState !== "unactive") {

            var currentConfigurationsIndex = this.props.globalState.combinationIndex
            //patch for metroneme in transition
            this.stopTransitionSounds()
            //end of patch

            this.rhythmManager.stop(currentConfigurationsIndex)
            this.sixteenthCounter = 0;
            this.setGlobalState({ ...this.props.globalState, heandClass: "heandsWrapper", sixteenthCounter: 0, combinationIndex: currentConfigurationsIndex - this.step })
            if (!isPaused) {

                setTimeout(() => {

                    this.rhythmManager.start(0, currentConfigurationsIndex - this.step)
                }, 0);
            }

        } else {
            console.error("you reached the beginning of list of configurations, or the metronome is unactive, you can not go to the previous configuration")
        }
    }
    resetConfiguration() {
        this.sixteenthCounter = this.ticCounterInitialValue
        this.metronomeTic = this.ticCounterInitialValue

        this.listOfTimes = []
        this.props.props.heandController[1]({ heandClass: "heandsWrapper" })
        document.documentElement.style.setProperty('--ledBrightness', 0);
        this.setGlobalState({ ...this.props.globalState, combinationIndex: 0 })

    }

    fermaMetronomo() {
        if (this.runningState === "active" || this.runningState === "paused") {

            let newCombinationsList
            if (this.props.globalState.selectedLevels.indexOf(5) !== -1) {
                console.log("è livello nerd")
                newCombinationsList = CombinationsFromPoolOfCombinations(
                    fromSelectedLecturesToListOfLectures(this.props.globalState.nerdModeLectures),
                    this.props.globalState.numberOfConfigurations
                )
            } else {
                newCombinationsList = CombinationsFromLevels(this.props.globalState.selectedLevels, this.props.globalState.numberOfConfigurations)

            }
            var currentConfigurationsIndex = this.props.globalState.combinationIndex
            this.runningState = "unactive"
            console.log("going to save outcomes")
            this.saveOutcome()
            //console.log(this.rhythmManager.transitionSoundsArray)
            //patch for metroneme in transition
            console.log("going to stop transitions sounds")
            this.stopTransitionSounds()
            //end of patch
            console.log("going to stop")
            this.rhythmManager.stop(currentConfigurationsIndex)
            console.log("ferma metronomo")
            this.sixteenthCounter = 0
            this.setGlobalState({ ...this.props.globalState, combinationsList: newCombinationsList, combinationIndex: 0, sixteenthCounter: -1, currentOutcome: { outcome: [] } })
        } else {
            console.error("it's already unactive")
        }



    }
    attivaMetronomo() {
        this.rhythmManager.audioContext.resume().then(() => {
            console.log('Playback resumed successfully');
        })
        if (this.runningState === "unactive") {
            this.isActive = true;
            this.runningState = "active"
            this.listOfDrumHits = [[]]
            var timeStamp = Math.floor(Date.now() / 1000);
            var outcome = this.props.globalState.currentOutcome
            outcome.beginningMoment = timeStamp
            this.setGlobalState({ ...this.props.globalState, currentOutcome: outcome })
            this.rhythmManager.nextConfiguration = this.nextConfiguration
            this.rhythmManager.start(0, 0)
        } else {
            console.error("it's already running")
        }




    }
    pausaMetronomo() {
        this.props.setGlobalState({ ...this.props.globalState })
        this.rhythmManager.pauseResume()


    }


    render() {
        var trainingButtons = [<></>, <></>];
        if (this.props.globalState.navigation === "training" && this.runningState != "unactive") {
            trainingButtons = [
                <button onClick={this.nextConfiguration.bind(this)}>⏭️</button>,
                <button onClick={this.restartConfiguration.bind(this)}>⏪</button>,
                <button onClick={this.previousConfiguration.bind(this)}>⏮️</button>
            ]
        }


        if (this.runningState === "unactive") {
            this.buttons = <button onClick={this.attivaMetronomo.bind(this)}>▶️</button>
        } else if (this.runningState === "paused") {

            this.buttons = <>
                <button onClick={this.pausaMetronomo.bind(this)}>▶️</button>
                <button onClick={this.fermaMetronomo.bind(this)}>⏹️</button>
            </>
        } else {
            this.buttons = <>
                <button onClick={this.pausaMetronomo.bind(this)}>⏸️</button>
                <button onClick={this.fermaMetronomo.bind(this)}>⏹️</button>
            </>
        }
        var drumClick
        var drumTouch
        if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
            drumClick = () => { }
            drumTouch = this.drumTouch.bind(this)
        } else {
            drumClick = this.drumTouch.bind(this)
            drumTouch = () => { }

        }

        return (
            <>
                <div className='buttons'>
                    {trainingButtons[2]}
                    {trainingButtons[1]}
                    {this.buttons}

                    {trainingButtons[0]}
                </div>
                <div className="drum" onTouchStart={drumTouch} onMouseDown={drumClick}></div>
            </>
        )

    }

}

export default Metronome;

