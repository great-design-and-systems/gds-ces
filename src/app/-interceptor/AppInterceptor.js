const AppInterceptor = (done, context) => {
    if (context) {
        if (context.security) {
            //TODO: done some security interceptor
            const security = context.security;
            if (!security.role || !security.for) {
                throw new Error('Property role and for are required for security context.');
            } else {
            }
        }
    } else {
        done();
    }
}
export default AppInterceptor;