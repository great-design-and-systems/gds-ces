export default class FieldValidator {
    constructor(event, message, handler, type) {
        this.event = event;
        this.message = message;
        this.handler = handler;
        this.invalid = false;
        this.type = type;
    }

    setMessage(message) {
        this.message = message;
    }

    setEvent(event) {
        this.event = event;
    }

    setHandler(handler) {
        this.handler = handler;
    }

    setInvalid(invalid) {
        this.invalid = invalid;
    }
}