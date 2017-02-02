import React from 'react';

export function action(domain, action) {
    return '{' + domain + '.' + action + '}';
}
export function wrapComponent(name, WrappedComponent) {
    function wrap(props) {
        return <WrappedComponent {...props} />
    }
    const wrappedComponentName = WrappedComponent.displayName
        || WrappedComponent.name
        || 'Component';

    wrap.displayName = 'with${name}(${wrappedComponentName})';
    return wrap;
}

export function isApiActionDone(api, action) {
    action = action.replace('{', '').replace('}', '');
    let isDone = false;
    const splitted = action.split('.');
    let domainContext = eval('api.' + splitted[0]);
    if (domainContext) {
        let actionContext = eval('domainContext.' + splitted[1]);
        if (actionContext) {
            isDone = !!actionContext.done;
        }
    }
    return isDone;
}

export function getRandomColor() {
    return '#' + Math.floor(Math.random() * 16777215).toString(16);
}

export function getActionData(api, domain, action, evaluate) {
    let actionDomain = api[domain] ? api[domain][action] : undefined;
    let data;
    if (actionDomain) {
        if (evaluate) {
            data = eval('actionDomain.' + evaluate);
        } else {
            data = actionDomain;
        }
    }
    return data;
}
export function processAsyncArray(asyncArray, callback) {
    if (asyncArray && asyncArray.length > 0) {
        const batchAction = asyncArray.shift();
        console.log('running action ', batchAction.name);
        batchAction.action(() => {
            processAsyncArray(asyncArray, callback);
        })
    } else {
        callback();
    }
}
export class BatchAction {
    constructor(name, action) {
        if (!name) {
            throw new Error('Name param is required');
        }
        if (!action) {
            throw new Error('Action param is required');
        }
        this.name = name;
        this.action = action;
    }
}
export class BatchProcessor {
    constructor(actions) {
        this.actions = actions || [];
    }
    push(action) {
        if (action instanceof BatchAction) {
            this.actions.push(action);
        } else {
            throw new Error('Adding a non BatchAction to a BatchProcessor');
        }
    }
    isRunning() {
        return this.running;
    }
    execute(callback) {
        this.running = true;
        processAsyncArray(this.actions, () => {
            this.running = false;
            if (callback) {
                callback();
            }
        });
    }
}