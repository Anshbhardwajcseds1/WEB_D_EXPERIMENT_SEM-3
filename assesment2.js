const EventEmitter = require("events");

class Element extends EventEmitter {
    constructor(name, parent = null) {
        super();
        this.name = name;
        this.parent = parent;
    }

    addEventListener(type, handler) {
        this.on(type, handler);
    }

    removeEventListener(type, handler) {
        this.off(type, handler);
    }

    dispatchEvent(type, data = {}) {
        const event = {
            type: type,
            target: this,
            currentTarget: this,
            data: data,
            stopped: false,

            stopPropagation() {
                this.stopped = true;
            }
        };

        // Start bubbling from the target
        let current = this;

        while (current) {
            event.currentTarget = current;

            // Run listeners on current element
            current.emit(type, event);

            // Stop bubbling if stopPropagation() was called
            if (event.stopped) {
                break;
            }

            // Move to parent
            current = current.parent;
        }
    }
}

// Create hierarchy
const documentElement = new Element("document");
const form = new Element("form", documentElement);
const button = new Element("button", form);


// Button click handler
function buttonClickHandler(event) {
    console.log(
        `Button listener: target=${event.target.name}, currentTarget=${event.currentTarget.name}`
    );
}

// Form click handler
function formClickHandler(event) {
    console.log(
        `Form listener: target=${event.target.name}, currentTarget=${event.currentTarget.name}`
    );
}

// Document click handler
function documentClickHandler(event) {
    console.log(
        `Document listener: target=${event.target.name}, currentTarget=${event.currentTarget.name}`
    );
}


// Attach click listeners
button.addEventListener("click", buttonClickHandler);
form.addEventListener("click", formClickHandler);
documentElement.addEventListener("click", documentClickHandler);


// --------------------------------------------------
// Scenario A
// --------------------------------------------------

console.log("\n--- Scenario A: Normal bubbling ---");

button.dispatchEvent("click", {
    message: "Button clicked"
});


// --------------------------------------------------
// Scenario B
// --------------------------------------------------

console.log("\n--- Scenario B: stopPropagation() ---");

// Remove old form listener
form.removeEventListener("click", formClickHandler);

// Create new form listener that stops propagation
function formStopHandler(event) {
    console.log(
        `Form listener: target=${event.target.name}, currentTarget=${event.currentTarget.name}`
    );

    event.stopPropagation();
}

form.addEventListener("click", formStopHandler);

button.dispatchEvent("click", {
    message: "Button clicked again"
});


// --------------------------------------------------
// Scenario C
// --------------------------------------------------

console.log("\n--- Scenario C: Remove button listener ---");

button.removeEventListener("click", buttonClickHandler);

button.dispatchEvent("click", {
    message: "Button clicked after removing listener"
});


// --------------------------------------------------
// Keypress event
// --------------------------------------------------