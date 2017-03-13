export default class RenderList {
    constructor(list, each) {
        this.renderedItems = [];
        if (each.preComponent) {
            this.renderedItems.push(each.preComponent());
        }
        if (list && list.length) {
            list.forEach((item, index) => {
                this.renderedItems.push(each.component(item, index));
            });
        } else if (each.emptyComponent) {
            this.renderedItems.push(each.emptyComponent());
        }
        if (each.postComponent) {
            this.renderedItems.push(each.postComponent());
        }
    }

    render() {
        return this.renderedItems;
    }
}