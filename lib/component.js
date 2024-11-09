import { BaseComponentTest } from "../types/global.js";
import { CreateState } from "./state.js";
import { deepEqual } from "./utils.js";


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
     * @private
     * @type {Record<string, any>}
     */
    _prevProps = {};
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
        this._prevProps = props;
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
    setProps(update) {
        if (deepEqual(update, this._prevProps)) {
            return
        }
        this.props = { ...this.props, ...update };
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

/**
 * @param {import("../types/global.js").HTMLElementString} type
 *@param {import("../types/global.js").ComponentProps} props 
 @param {...BaseComponentTest | string | null} children 
 @returns {BaseComponentTest}
 * */
function createElement(type, props, ...children) {
    const createdChildren = Array(children.length);
    let idx = 0;
    for (let i = 0; i < children.length; i++) {
        if (children[i] === null) {
            continue;
        }
        createdChildren[idx++] = children[i];
    }

    return new BaseComponentTest({});
}
