import {Accessor, Show} from "solid-js";

export interface MessageStates {
    loaded: Accessor<boolean>;
    netErr: Accessor<boolean>;
    intErr: Accessor<boolean>;
    exists: Accessor<boolean>;
}

export function Message(states: MessageStates) {
    return (
        <>
            <Show when={!states.netErr() && !states.intErr()}>
                <Show when={!states.loaded()}>
                    Loading...
                </Show>
                <Show when={!states.exists() && states.loaded()}>
                    No Bulletin
                </Show>
            </Show>
            <Show when={states.netErr()}>
                Network Error
            </Show>
            <Show when={states.intErr()}>
                Server Error
            </Show>
        </>
    )
}