import { Image } from './../../../common/AppComponents';
import React from 'react';

export default class GridItem extends React.Component {
    constructor(props) {
        super();
    }
    componentWillMount() {
        console.log('categoryItem', this.props.categoryItem);
        this.setState({
            item: this.props.categoryItem
        })
    }
    render() {
        return (
            <figure class="effect-goliath">
                <Image fileId={this.state.item.imageId} />
                <figcaption>
                    <p>{this.state.item.name}</p>
                </figcaption>
            </figure>)
    }
}