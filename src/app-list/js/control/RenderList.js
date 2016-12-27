import {wrapComponent} from '../../../common/AppUtils';

export default class RenderList {
    constructor(list, each){
        this.renderedItems = [];     
        if(list){
            list.forEach((item, index) => {
                this.renderedItems.push(wrapComponent('AppListComponent', each.component(item,index))());
            });
        }
        console.log('RenderList', this.renderedItems);
    }
    render() {
        return this.renderedItems;
    }
}