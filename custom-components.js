class CustomComponent extends HTMLElement {
    constructor(){
        super()
        console.log("My custom component got instantiated!")

        this.attachShadow({mode: 'open'}); 
        this.mainComp = document.createElement('span')
        this.mainComp.setAttribute('class','custom-comp');

        this.customStyle = "";
        this.__style = document.createElement("style")
        this.__style.textContent = ""

        this.shadowRoot.appendChild(this.__style);
        this.shadowRoot.appendChild(this.mainComp);
    }

    /**
     * Lifecycle method, called whenever an observed property changes
     */
    attributeChangedCallback(name, old, newName){
        this.display()
    }

    /**
     * To be implemented by the child class
     */
    render() {
        return null;
    }

    display() {
        this.__style.textContent = this.customStyle;
        while(this.mainComp.children.length > 0){
            this.mainComp.removeChild(this.mainComp.childNodes[0])
        }
        this.mainComp.appendChild(this.render())
    }

    /**
     * Turns a string split with "-" into camel case notation
     */
    sanitizeName(name) {
        let parts = name.split("-")
        return [parts.shift(), ...parts.map(n => n[0].toUpperCase() + n.slice(1))].join("")
    }

    /**
     * Creates one property on this class for every
     * HTML property defined on the element
     */
    setUpAccessors() {
        let attrs = this.getAttributeNames()
        attrs.forEach( name => {
            Object.defineProperty(this, this.sanitizeName(name), {
                set: (value) => this.setAttribute(name, value),
                get: _ => this.getAttribute(name)
            })
        })
    }

    /**
     * Lifecycle method, called once the component is connected to the DOM
     */
    connectedCallback() {
        this.setUpAccessors()
        this.display()                    
    }
}