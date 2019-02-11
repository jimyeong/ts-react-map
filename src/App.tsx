import * as React from 'react';
import { Router } from 'react-router';
import DaumMapComponent from './assets/components/map/DaumMapComponent';
import {Marker} from './assets/components/map/DaumMapComponent';

import {history} from './assets/components/helper/HistoryHelper';


interface IRootState{
    marker: any[];
    polygons: any[];
};

interface IMarkerCompProps{
    position: IPositionObject;
    map? : any;

}

interface IPositionObject{
    lat: number;
    lng: number;
}

class App extends React.Component<any, IRootState> {
    state: any = [];
    constructor(props: any) {
        super(props);
        this.state = {
            marker: [],
            polygons: []
        }
    }

    componentDidMount() {

    }
    onClickMap = (event: any) => {
        let position = {
            lat : event.latLng.getLat(),
            lng : event.latLng.getLng()
        };
        this.setState({
            ...this.state,
            marker: [
                ...this.state.marker,
                position
            ]
        });
        console.log(this.state.marker)
    };


    public render(){

        return(
            <Router history={ history }>
                <React.Fragment>
                    <DaumMapComponent
                        className="daum-map-component"
                        onMapClick={this.onClickMap.bind(this)}>
                        { this.state.marker.map((markerPosition: IPositionObject, i: number):any => {
                            return <Marker position={markerPosition} key={i}/>
                        })}
                    </DaumMapComponent>
                </React.Fragment>
            </Router>
        )
    }
}



















export default App;

