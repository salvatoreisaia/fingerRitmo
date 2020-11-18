class HandleVisibilityChange {
  constructor() {




    if (typeof document.hidden !== "undefined") { // Opera 12.10 and Firefox 18 and later support 
      this.hidden = "hidden";
      this.visibilityChange = "visibilitychange";
    } else if (typeof document.msHidden !== "undefined") {
      this.hidden = "msHidden";
      this.visibilityChange = "msvisibilitychange";
    } else if (typeof document.webkitHidden !== "undefined") {
      this.hidden = "webkitHidden";
      this.visibilityChange = "webkitvisibilitychange";
    }
  }
  handleVisibilityChange() {
    var globalState = window.m.props.globalState
    if (this.hidden) {
      if (window.m.runningState === "active") {
        window.m.pausaMetronomo()
      }
      window.m.props.setGlobalState({ ...globalState, pageVisible: false })
    } else {
      window.m.props.setGlobalState({ ...globalState, pageVisible: true })
    }

  }
  init() {

    if (typeof document.addEventListener === "undefined" || this.hidden === undefined) {
      console.log("This function requires a browser, such as Google Chrome or Firefox, that supports the Page Visibility API.");
    } else {
      // Handle page visibility change   
      console.log("visibility handler initialized")
      document.addEventListener(this.visibilityChange, this.handleVisibilityChange, false);
    }

  }
}
export default HandleVisibilityChange