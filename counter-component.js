class CounterComponent extends CustomComponent{
    static observedAttributes = ['current-counter'];
    constructor() {
        super()

        this.customStyle = `
            .custom-comp{
                padding: 10px;
                display: block;
                color: red;
            }
            .legend {
                display: block;
            }
            button {
                margin: 5px;
            }
        `;
    }                 

    handleUpClick(evt) {
        this.currentCounter++
    }
    handleDownClick() {
        this.currentCounter--;
    }

    render() {


        const wrapper = document.createElement("div")

        const textElem = document.createElement("span")
        textElem.setAttribute("class", "legend")
        const text = this.getAttribute("data-text")
        textElem.textContent = text.replace("$$", this.currentCounter)
        wrapper.appendChild(textElem)

        const buttonUp = document.createElement("button")
        buttonUp.textContent = "Up"
        buttonUp.addEventListener("click", this.handleUpClick.bind(this))
        wrapper.appendChild(buttonUp)

        const buttonDown = document.createElement("button")
        buttonDown.textContent = "Down"
        buttonDown.addEventListener("click", this.handleDownClick.bind(this))
        wrapper.appendChild(buttonDown)

        return wrapper
    }

    
}

customElements.define("counter-component", CounterComponent)