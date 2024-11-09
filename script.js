import { BaseComponent } from "./lib/component.js"

class Test1 extends BaseComponent {
    /**
     * @constructor
     * @param {Record<string, any>} props 
     */
    constructor(props) {
        super(props)
        this.state = {
            count: 0
        }
    }

    render() {
        console.log("rnder:", this.id);
        console.log("props:", this.props);
        const elem = document.createElement("div");
        elem.style.backgroundColor = "red";
        elem.style.color = "white";
        elem.id = this.id;

        const div = document.createElement("div");
        div.innerHTML = String(this.state.count);
        elem.appendChild(div);

        const button = document.createElement("button");
        button.innerHTML = "incremnet";
        button.onclick = () => this.setState(prev => ({ ...prev, count: this.state.count + 1 }));

        elem.appendChild(button);

        domRender(elem, this.props.child, { dontRerender: 0 });
        return elem;
    }
}

class Test2 extends BaseComponent {
    /**
     * @constructor
     * @param {Record<string, any>} props 
     */
    constructor(props) {
        super(props)
    }

    render() {
        console.log("rnder:", this.id);
        console.log("props:", this.props);
        const elem = document.createElement("div");
        elem.style.backgroundColor = "blue";
        elem.style.color = "white";
        elem.id = this.id;
        const propskeys = Object.keys(this.props);
        if (propskeys.length > 0) {
            let str = "";
            for (let i = 0; i < propskeys.length; i++) {
                str += `${propskeys[i]}:${this.props[propskeys[i]]}\n`;
            }
            elem.innerHTML = str;
        } else {
            elem.innerHTML = "inner";
        }

        return elem
    }
}

const test2 = new Test2({});
const test1 = new Test1({ child: test2 });



/**
 * @param {HTMLElement} parent
 * @param {BaseComponent} child 
 * @param {Record<string, any>}[props={}] props
 * */
function domRender(parent, child, props = {}) {
    child.setProps(props);
    parent.append(child.render());
}

/**
 * @param {BaseComponent} child 
 * */
function enrtyPoint(child) {
    const root = document.getElementById("root");
    domRender(root, child);
}

enrtyPoint(test1);
