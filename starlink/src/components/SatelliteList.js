import React, {Component} from 'react';
import {Button, List, Avatar, Checkbox, Spin} from "antd";
import satellite from "../assets/images/satellite.svg";

class SatelliteList extends Component {
    constructor(){
        super();
        this.state = {
            selected: [],
            isLoad: false
        };
    }

    onChange = e => {
        // console.log('clicked',e.target);
        // step 1: satellite,  if checked
        const { dataInfo, checked } = e.target;
        //step 2 update selected satellite list
        const { selected } = this.state;
        // step 3: get new selected list
        const list = this.addOrRemove(dataInfo, checked, selected);
        //step 4: update
        this.setState({ selected: list })
    }

    addOrRemove = (item, status, list) => {
        const found = list.some( entry => entry.satid === item.satid);
        // case1: checked is true
        // item not in list -> add it
        // item in list -> do nothing
        if(status && !found){
            list.push(item)
        }

        //case2 : checked is false
        // -> item is in the list -> remove it
        // -> is not in list -> do nothing
        if(!status && found){
            // list = list.filter( entry => {
            //     return entry.satid !== item.satid;
            // });
            // same with above
            list = list.filter(entry => entry.satid !== item.satid);
        }
        return list;
    }

    onShowSatMap = () =>{
        this.props.onShowMap(this.state.selected);
    }

    render() {
        const satList = this.props.satInfo ? this.props.satInfo.above : [];
        const { isLoad } = this.props;
        const { selected } = this.state;

        return (
            <div className="sat-list-box">
                <Button className="sat-list-btn"
                        size="large"
                        disabled={ selected.length === 0}
                        onClick={this.onShowSatMap}
                >Track on the map</Button>
                <hr/>

                {
                    isLoad ?
                        <div className="spin-box">
                            <Spin tip="Loading..." size="large" />
                        </div>
                        :
                        <List
                            className="sat-list"
                            itemLayout="horizontal"
                            size="small"
                            dataSource={satList}
                            renderItem={item => (
                                <List.Item
                                    actions={[<Checkbox dataInfo={item}
                                                        onChange={this.onChange}/>]}
                                >
                                    <List.Item.Meta
                                        avatar={<Avatar size={50} src={satellite} />}
                                        title={<p>{item.satname}</p>}
                                        description={`Launch Date: ${item.launchDate}`}
                                    />

                                </List.Item>
                            )}
                        />
                }
            </div>
        );
    }
}

export default SatelliteList;
