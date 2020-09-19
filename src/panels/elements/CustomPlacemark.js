import React from 'react';
import {YMaps, Map, Placemark, withYMaps} from 'react-yandex-maps';


// @live
class TemplateProvider extends React.Component {
    constructor() {
        super();
        this.state = { template: null };
    }

    componentDidMount() {
        this.setState({
            template: this.props.ymaps.templateLayoutFactory.createClass(
                '<div style="background-color: #000;">$[properties.iconContent]</div>'
            ),
        });
    }

    render() {
        return this.props.children({ template: this.state.template });
    }
}

const ConnectedTemplateProvider = withYMaps(TemplateProvider, true, [
    'templateLayoutFactory',
]);

const CustomPlacemark = () => (
        <ConnectedTemplateProvider>
            {({ template }) => (
                <Placemark
                    geometry={[55.75, 37.57]}
                    options={{
                        balloonContentLayout: template,
                        iconContentLayout: template,
                    }}
                    // Load balloon addon for all geo objects
                    modules={['geoObject.addon.balloon']}
                />
            )}
        </ConnectedTemplateProvider>
);

export default CustomPlacemark;