import React, {Component} from 'react';
import SatSetting from "./SatSetting";
import SatelliteList from "./SatelliteList"
import {NEARBY_SATELLITE, SAT_API_KEY, STARLINK_CATEGORY} from "../constants"
import axios from 'axios';
import WorldMap from "./WorldMap";

class Main extends Component {
    constructor() {
        super();
        this.state = {
            satInfo: null,
            setting: null,
            satList: null,
            isLoadingList: false
        }
    }

    componentDidMount() {
        //fetch data

    }

    showNearbySatellite = (setting) => {
        this.setState({
            setting: setting
        });
        //fetch data
        this.fetchSatellite(setting);
    }

    fetchSatellite = (setting) => {
        //step 1: get setting data
        const {latitude, longitude, elevation, altitude} = setting;
        //step 2: get url
        const url = `/api/${NEARBY_SATELLITE}/${latitude}/${longitude}/${elevation}/${altitude}/${STARLINK_CATEGORY}/&apiKey=${SAT_API_KEY}`;

        //step 3: trigger isLoading
        this.setState( {
            isLoadingList : true
        })


        //step 4: make ajax call
        axios.get(url)
            .then(response => {
                console.log(response.data)
                this.setState({
                    satInfo: response.data,
                    isLoadingList: false
                })
            })
            .catch(error => {
                console.log('err in fetch satellite -> ', error);
            })
    }

    showMap = selected => {
        console.log(selected);
        this.setState(preState => ({
            ...preState,
            satList: [...selected]
        }))
    }

    render() {
        const {satInfo, isLoadingList, satList, setting} = this.state;
        return (
            <div className='main'>
                <div className='left-side'>
                    <SatSetting onShow={this.showNearbySatellite}/>
                    <SatelliteList satInfo = {satInfo}
                                   isLoad = {isLoadingList}
                                   onShowMap = {this.showMap}
                    />
                </div>
                <div className='right-side'>
                    <WorldMap satDate = {satList}
                              observerData = {setting}
                    />
                </div>
            </div>
        );
    }
}

export default Main;