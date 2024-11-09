export { };

export type HTMLElementString = keyof HTMLElementTagNameMap | null;
export declare class BaseComponentTest {
    id: string;
    key: string | null;
    type: HTMLElementString;
    props: ComponentProps;
    private _prevProps: Record<string, any>;
    state: Record<string, any>;
    private _state: CreateState;

    constructor(props: Record<string, any>);

    private _setState(update: Record<string, any>): void;
    setProps(update: Record<string, any>): void;
    setState(update: Record<string, any>): void;
    render(): HTMLElement;
    private reRender(): void;
}

export interface ComponentProps extends Record<string, any> {
    children: BaseComponentTest | string | null[];
}

import { CreateState } from "../lib/state.js"
