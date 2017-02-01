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