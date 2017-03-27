import { Api } from '../../api/ApiService';
import AppContent from '../-content/js/AppContent';
import AppSidebar from '../-sidebar/js/AppSidebar';
import AppSplash from '../-splash/js/AppSplash';
import { GDS_API } from '../../common/AppConstants';
import React from 'react';
import SidebarStore from '../-sidebar/js/AppSidebarStore';
import { StickyContainer } from 'react-sticky';
import { connect } from 'react-redux';
import {CardCatalog} from '../../common/AppComponents';
const sample = {
    "position": "76",
    "leader": "01506cam a2200265   4500",
    "controlField": {
        "001": "319004",
        "005": "19980120130445.0",
        "008": "710119r19701921nyuac    b    010 0 eng"
    },
    "dataField": {
        "245": {
            "a": "Dante; essays in commemoration, 1321-1921."
        },
        "260": {
            "a": "New York,",
            "b": "Haskell House,",
            "c": "1970."
        },
        "300": {
            "a": "vii, 255 p.",
            "b": "illus., port.",
            "c": "23 cm."
        },
        "500": [
            {
                "a": "\"First published 1921.\""
            },
            {
                "a": "Text in English and Italian."
            }
        ],
        "504": {
            "a": "Includes bibliographical references."
        },
        "505": {
            "a": "Some thoughts on Dante in his relation to our own time, by Viscount Bryce.--Carattere e unità della poesia di Dante, by B. Croce.--Allegory and myth, by W. P. Ker.--Oxford and Dante, by P. Toynbee.--Inferno [and] The voyage of Ulysses. Translation[s] by L. Binyon.--Dante as literary critic, by E. G. Gardner.--The Italy of Dante and the Italy of Virgil, by J. W. MacKail.--Inferno [and] Farinata. Translation[s] by H. E. Goad.--Notes on the date of composition of the De monarchia, by C. Foligno.--Dante and the Latin poets, by P. H. Wicksteed.--Dante and the troubadours, by A. G. F. Howell.--Humour of Dante, by L. Ragg.--A quel modo che ditta dentro, by A. Cippico."
        },
        "600": {
            "a": "Dante Alighieri,",
            "d": "1265-1321",
            "x": "Criticism and interpretation."
        },
        "906": {
            "a": "7",
            "b": "cbc",
            "c": "orignew",
            "d": "2",
            "e": "ncip",
            "f": "19",
            "g": "y-gencatlg"
        },
        "991": {
            "b": "c-GenColl",
            "h": "PQ4363.B21",
            "i": "D3 1970",
            "t": "Copy 1",
            "w": "BOOKS"
        },
        "035": {
            "9": "(DLC)   74132438"
        },
        "010": {
            "a": "74132438"
        },
        "020": {
            "a": "0838311946"
        },
        "040": {
            "a": "DLC",
            "c": "DLC",
            "d": "DLC"
        },
        "041": {
            "a": "engita"
        },
        "050": {
            "a": "PQ4363.B21",
            "b": "D3 1970"
        },
        "082": {
            "a": "851/.1"
        }
    }
};
@connect()
export default class App extends React.Component {
    componentWillMount() {
        this.setState({});
        new Api().init(GDS_API, err => {
            if (!err) {
                this.setState({loaded: true});
            } else {
                this.setState({
                    loaded: true,
                    error: err
                });
            }
        });
        this.componentWillReceiveProps(this.props);
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            contentBody: nextProps.contentBody,
            contentMenu: nextProps.contentMenu
        });
    }

    render() {
        let app = <AppSplash header={'LibCat'} message={'Loading awesomeness...'}/>;
        if (this.state.loaded) {
            app = (
                <StickyContainer id="appComponent">
                    <AppContent contentBody={this.state.contentBody}/>
                </StickyContainer>
            );
        }
        return (
            <div id="appRootComponent">
                <AppSidebar store={SidebarStore} outerContainerId={'appRootComponent'} pageWrapId={'appComponent'}>
                    {this.state.contentMenu}
                </AppSidebar>
                <CardCatalog marc={sample}/>
            </div>
        );
    }
}