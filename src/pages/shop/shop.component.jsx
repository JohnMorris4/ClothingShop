import React from "react";
import CollectionsOverview from "../../components/collections-overview/collections-overview.component";
import {Route} from 'react-router-dom';
import CollectionPage from "../collection/collection.component";
import {firestore, convertCollectionsSnapshotToMap} from "../../firebase/firebase.utils";
import { connect } from 'react-redux';

import WithSpinner from "../../components/with-spinner/with-spinner.component";
import {updateCollections} from "../../redux/shop/shop.actions";



const CollectionsOverviewWithSpinner = WithSpinner(CollectionsOverview);
const CollectionsPageWithSpinner = WithSpinner(CollectionPage);

class ShopPage extends React.Component {
    // constructor() {
    //     super();
    //     this.state = {
    //         loading: true
    //     }
    // }

    state = {
        loading: true
    }

    unsubscribeFromSnapshot = null;
    componentDidMount() {
        const {updateCollections } = this.props;
        const collectionRef = firestore.collection('collections');
        this.unsubscribeFromSnapshot = collectionRef.onSnapshot(async snapshot => {
            const collectionsMap = convertCollectionsSnapshotToMap(snapshot);
            updateCollections(collectionsMap);
            this.setState({loading: false});
        });
    }

    render() {
        const {match} = this.props;
        const {loading} = this.state;
        return(
            <div className='shop-page'>
                <Route exact path={`${match.path}`}
                       render={(props) => <CollectionsOverviewWithSpinner isLoading={loading}{...props} />} />
                <Route path={`${match.path}/:collectionId`}
                       render={(props) => <CollectionsPageWithSpinner isLoading={loading} { ...props } />} />
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => ({
    updateCollections: collectionsMap => dispatch(updateCollections(collectionsMap))
})

export default connect(null, mapDispatchToProps) (ShopPage);





