import { BaseComponent, Elem as Elem1 } from "./lib/statePubSub.js"

function parent(child) {
    document.body.appendChild(child);
}

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
        const elem = document.createElement("div");
        elem.id = this.id;

        const div = document.createElement("div");
        div.innerHTML = String(this.state.count);
        elem.appendChild(div);

        const button = document.createElement("button");
        button.innerHTML = "incremnet";
        button.onclick = () => this.setState(prev => ({ ...prev, count: this.state.count + 1 }));

        elem.appendChild(button);

        elem.appendChild(this.props.child);
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
        const elem = document.createElement("div");
        elem.id = this.id;
        elem.innerHTML = "inner";

        return elem
    }
}

const test2 = new Test2({});
const test1 = new Test1({ child: test2.render() });

parent(test1.render());

