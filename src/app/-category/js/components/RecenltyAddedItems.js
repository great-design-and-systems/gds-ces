import { Image } from '../../../../common/AppComponents';
import React from 'react';
import Slider from 'react-slick';
import { connect } from 'react-redux';
import { query } from '../../../../api/ApiActions';

export default class RecenltyAddedItems extends React.Component {
    constructor(props) {
        super();
        this.settings = {
            dots: true,
            infinite: true,
            speed: 500,
            slidesToShow: 1,
            slidesToScroll: 1
        };
    }
    componentWillMount() {
        this.setRecentlyAddedItemsState(this.props);
    }
    componentDidUpdate(prevProps) {
        if (prevProps.category._id !== this.props.category._id) {
            this.setRecentlyAddedItemsState(this.props);
        }
    }
    setRecentlyAddedItemsState(props) {
        this.setState({
            recentItems: props.recentItems
        });
    }
    render() {
        let slider = <span></span>;
        if (this.state.recentItems) {
            const recentItemsElements = [];
            this.state.recentItems.forEach(item => {
                recentItemsElements.push(<Image key={item._id} fileId={item.imageId} />);
            });
            slider = (<Slider {...this.settings}>
                {recentItemsElements}
            </Slider>);
        }
        return <div class="recent-items-carousel">
            <h4>Recently added</h4>
            {slider}
        </div>;
    }
}