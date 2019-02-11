import * as React from 'react';
import {daumMapInit} from '../lib/DaumMapWrapper';
import './map.less';

declare global{
    var daum: any;
}

interface IDaumMapComponentProps{
    onMapClick(event: any): void;
    className: string;
}

interface IMarkerCompProps{
    position: IPositionObject;
    map? : any;
}

interface IPositionObject{
    lat: number;
    lng: number;
}

class DaumMapComponent extends React.Component<IDaumMapComponentProps> {

    public map: any = null;
    private mapRef = React.createRef<HTMLDivElement>();

    componentDidMount() {
        daumMapInit('aa714561093a0e01eb5a412ec8869d3a')
            .then(map => {
                    let mapOption = {
                        center: new daum.maps.LatLng(33.450701, 126.570667), // 지도의 중심좌표
                        level: 3 // 지도의 확대 레벨
                    };
                    this.map = new daum.maps.Map(this.mapRef.current, mapOption);

                    if(!this.props.onMapClick){

                    }else{
                        daum.maps.event.addListener(this.map, 'click', this.props.onMapClick);
                    }
            })
    }

    public render(){
        let markers: any = [];
        if(this.map){
            React.Children.map(this.props.children, (child: any,i: number): void => {
                if(child.type === Marker){
                    markers.push(React.cloneElement(child, { map: this.map , key:i}))
                }
            })
        }
        return(
            <div ref={this.mapRef} className={this.props.className}>
                { markers }
            </div>
        )
    }
}



class Marker extends React.Component<IMarkerCompProps> {

    public marker: any = null;
    constructor(props: IMarkerCompProps) {
        super(props)
    }

    componentWillMount() {
        let position = this.props.position;
        let markerPosition: any = new daum.maps.LatLng(position.lat, position.lng);

        // 지도를 클릭한 위치에 표출할 마커입니다
        this.marker = new daum.maps.Marker({
            // 지도 중심좌표에 마커를 생성합니다
            position: markerPosition
        });

        // 지도에 마커를 표시합니다
        this.marker.setMap(this.props.map);
    }


    render() {
        return null
    }
}
export { Marker }


export default DaumMapComponent;