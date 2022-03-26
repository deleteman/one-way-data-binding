function createdBindedVariable(targetID) {
    let newVal = null;
    Object.defineProperty(window, targetID, {
        set: function(value) {
            newVal  =value
            let targetRef = document.getElementById(targetID)
            targetRef.innerHTML = value
        },
        get: function() {
            return newVal
        }
    })
    return window
}