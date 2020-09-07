let EntrySlider = function (min, max, init_value) {

    // Create div that can be inserted into DOM as the entry slider.
    let div = document.createElement('div');

    // Fill the div with the component UI elements
    // that make up the entry slider

    let range_slider = document.createElement('input');
    range_slider.setAttribute('type', 'range');
    range_slider.setAttribute('min', min);
    range_slider.setAttribute('max', max);
    range_slider.setAttribute('value', init_value);
    range_slider.style.width = "250px";

    let entry = document.createElement('input');
    entry.setAttribute('type', 'text');
    entry.style.width = "25px";
    entry.value = range_slider.value;

    div.append(range_slider);
    div.append(entry);
    div.style.width = "290px";

    // Set up array for any change listener handlers
    // registered with entry slider.

    let change_listeners = [];

    // Create function to call whenever entry slider
    // value changes. It invokes each handler registered
    // in turn, provides reference to entry slider as an argument.
    //
    // Notice use of array function expression passed to forEach
    // method of change listener array. Arrow functions bind this
    // on definition allowing us to know that the value of this
    // in body of the function will be appropriately bound to our
    // entry slider object (i.e., the current value of this).

    let update = () => {
        change_listeners.forEach((listener) => {
            listener(this);
        });
    };

    // Arrow function expression provided as second argument to
    // addEventListener has access to local variables in scope.
    // That's how it is able to call update function defined above.

    range_slider.addEventListener('input', () => {
        entry.value = range_slider.value;
        update();
    });

    // Same thing for handler attached to text entry event.

    entry.addEventListener('keydown', (e) => {
        if (e.key == 'Enter') {
            let v = parseInt(entry.value);
            if (!isNaN(v)) {
                range_slider.value = v;
            }
            entry.value = range_slider.value;
            update();
        }
    });

    // Instance methods set up below.
    // These are defined as properties on this (object being
    // constructed) and so are available publicly.

    // Mostly just getters for property values held in
    // local variables. Again, note the use of closures here.
    // Each slider object will
    // have separate values because each is associated with
    // a *different* invocation of the constructor function.
    // when the closure is formed.

    this.getDiv = function () {
        return div;
    }

    this.getMin = function () {
        return min;
    };

    this.getMax = function () {
        return max;
    }

    this.getValue = function () {
        return range_slider.value;
    }

    this.setValue = function (new_val) {
        range_slider.value = new_val;
        entry.value = range_slider.value;
        update();
    }

    // add/remove change listener methods
    this.addChangeListener = function (listener) {
        let i = change_listeners.findIndex(((l) => listener == l));
        if (i == -1) {
            change_listeners.push(l);
        }
    }

    this.removeChangeListener = function(listener) {
        let i = change_listeners.findIndex(((l) => listener == l));
        if (i != -1) {
            change_listeners.splice(i, 1);
        }
    }
};