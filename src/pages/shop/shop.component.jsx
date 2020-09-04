import React from "react";
import CollectionsOverview from "../../components/collections-overview/collections-overview.component";
import {Route} from 'react-router-dom';
import CollectionPage from "../collection/collection.component";
import { connect } from 'react-redux';
import {createStructuredSelector} from "reselect";
import WithSpinner from "../../components/with-spinner/with-spinner.component";
import {fetchCollectionsStartAsync} from "../../redux/shop/shop.actions";
import {selectIsCollectionFetching, selectIsCollectionLoaded} from "../../redux/shop/shop.selectors";

const CollectionsOverviewWithSpinner = WithSpinner(CollectionsOverview);
const CollectionsPageWithSpinner = WithSpinner(CollectionPage);

class ShopPage extends React.Component {
    // constructor() {
    //     super();
    //     this.state = {
    //         loading: true
    //     }
    // }

    unsubscribeFromSnapshot = null;
    componentDidMount() {
        const {fetchCollectionsStartAsync} =  this.props;
        fetchCollectionsStartAsync();
    }

    render() {
        const {match, isCollectionFetching, isCollectionLoaded} = this.props;
        //const {loading} = this.state;
        return(
            <div className='shop-page'>
                <Route exact path={`${match.path}`}
                       render={(props) => <CollectionsOverviewWithSpinner isLoading={isCollectionFetching}{...props} />} />
                <Route path={`${match.path}/:collectionId`}
                       render={(props) => <CollectionsPageWithSpinner isLoading={!isCollectionLoaded} { ...props } />} />
            </div>
        );
    }
}

const mapStateToProps = createStructuredSelector({
    isCollectionFetching: selectIsCollectionFetching,
    isCollectionLoaded: selectIsCollectionLoaded
})

const mapDispatchToProps = dispatch => ({
    fetchCollectionsStartAsync: () =>   dispatch(fetchCollectionsStartAsync())
})

export default connect(mapStateToProps, mapDispatchToProps) (ShopPage);





