import React from 'react';
import {Root, View, Panel} from '@vkontakte/vkui'
import '@vkontakte/vkui/dist/vkui.css';
import '../../assets/style.css'

import MapView from './MapView'

class Main extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            activeView: 'start',
            activePanel: 'map',
        }
    }

    render() {
        return (
            <Root activeView={this.state.activeView}>
                <View activePanel={this.state.activePanel} id='start'>
                    <Panel id='map'>
                        <MapView />
                    </Panel>
                </View>
            </Root>
        )
    }
}

export default Main;