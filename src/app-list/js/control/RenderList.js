export default class RenderList {
    constructor(list, each) {
        this.renderedItems = [];
        if (list) {
            list.forEach((item, index) => {
                this.renderedItems.push(each.component(item, index));
            });
        }
    }
    render() {
        return this.renderedItems;
    }
}