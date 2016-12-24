import React from 'react';

export function wrapComponent(name, WrappedComponent) {
    function wrap(props) {
        return <WrappedComponent {...props} appForm />
    }
    const wrappedComponentName = WrappedComponent.displayName
        || WrappedComponent.name
        || 'Component';

    wrap.displayName = 'with${name}(${wrappedComponentName})';
    return wrap;
}