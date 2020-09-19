import React from 'react';
import {Root, View, Panel, PanelHeader, PanelHeaderBack} from '@vkontakte/vkui'
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
                    <Panel id='posts'>
                        <PanelHeader left={<PanelHeaderBack onClick={ () => this.setState({ activePanel: 'map' }) } />}>Фото</PanelHeader>
                        <h1>Posts</h1>
                        {/*<PostsView />*/}
                    </Panel>
                </View>
            </Root>
        )
    }
}

export default Main;