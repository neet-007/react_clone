export class CreateState {
    constructor(initialValue) {
        this.state = initialValue;
        this.subscribers = [];
    }

    getState() {
        return this.state;
    }

    subscribe(callback) {
        const weakRef = new WeakRef(callback);
        this.subscribers.push(weakRef);

        return () => {
            this.subscribers = this.subscribers.filter(ref => ref.deref() !== callback);
        };
    }

    setState(update) {
        if (typeof update === 'function') {
            this.state = { ...this.state, ...update(this.state) };
        } else {
            this.state = { ...this.state, ...update };
        }
        for (let i = 0; i < this.subscribers.length; i++) {
            const callback = this.subscribers[i].deref();
            if (callback) callback(this.state);
        }
    }
}

function getId() {
    return Array(10).fill(0).map(() => Math.floor(Math.random() * 10)).reduce((acc, curr) => acc + String(curr), "");
}

export class BaseComponent {
    /** 
     * @type {string}
     */
    id = getId();
    /** 
     * @type {Record<string, any>}
     */
    props = {};
    /** 
     * @type {Record<string, any>}
     */
    state = {};
    /** 
     *@private
     * @type {CreateState}
     */
    _state = new CreateState(this.state);

    /**
     * @constructor
     * @param {Record<string, any>} props 
     */
    constructor(props) {
        this.id = getId();
        this.props = props;
        this.state = {};
        this._state = new CreateState(this.state);
        this._state.subscribe((update) => this._setState(update));
    }

    /**
     * @private
      @param {Record<string, any>}  update
    */
    _setState(update) {
        this.state = { ...this.state, ...update };
    }

    /**
      @param {Record<string, any>}  update
    */
    setState(update) {
        this._state.setState(update);
        this.reRender();
    }

    /**
     *@returns {HTMLElement}
     * */
    render() {
        return document.createElement("div");
    }

    /**
     * @private
     * */
    reRender() {
        const elem = document.getElementById(this.id);
        const parent = elem.parentElement;
        elem.remove();
        parent.appendChild(this.render());
    }
}


export class Elem {
    constructor(val) {
        this.elem = null;
        this.val = val;
        this.id = getId();
        this.state = new CreateState(val);
        this.state.subscribe((state) => this.update(state));

        this.render();
    }

    update(val) {
        this.val = val;
        const prev = document.getElementById(this.id);
        prev.remove();
        this.render()
    }

    render() {
        this.elem = document.createElement("div");
        this.elem.id = this.id;
        this.elem.innerHTML = this.val;

        const innerDiv = document.createElement("div");
        innerDiv.innerHTML = this.val;

        this.elem.appendChild(innerDiv);

        const button = document.createElement("button");
        button.innerHTML = "click me";
        button.onclick = () => {
            this.state.setState(this.state.getState() + 1);
        }

        this.elem.appendChild(button);
        document.body.appendChild(this.elem);
    }
}
