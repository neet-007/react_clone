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
