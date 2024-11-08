export function createState(initialValue) {
    let state = initialValue;
    const listeners = [];

    function subscribe(callback) {
        listeners.push(callback);

        return () => {
            const i = listeners.indexOf(callback);
            if (i != -1) listeners.splice(i, 1);
        }
    }

    function setState(value) {
        state = value;
        for (let i = 0; i < listeners.length; i++) {
            listeners[i](state);
        }
    }

    function getState() {
        return state;
    }

    return { subscribe, getState, setState }
}

export class Elem {
    constructor(type, val) {
        this.elem = document.createElement(type);
        this.elem.innerHTML = val;
        document.body.appendChild(this.elem);
        this.state = createState(val);
        this.state.subscribe((state) => this.update(state));
    }

    update(val) {
        this.elem.innerHTML = val;
    }
}
