import React, { useState, useEffect } from 'react';
import { HorizontalScroll, Group, Header, Title, Separator } from '@vkontakte/vkui';
import { GoogleMap, withScriptjs, withGoogleMap, Marker  } from 'react-google-maps';

import Topic from '../elements/Topic';
import Emotion from '../elements/Emotion';
import * as postLocation from '../../data/post-locations.json'

const mapWrapper = {
    height: '100vh',
}


function MapView() {
    const [marks, changeMarks] = useState([]);
    const [topicsList, changeTopic] = useState([
        {
            "id": "topic_1",
            "title": "it",
            "name": "IT",
            "emoji": "💻",
            "status": ""
        },
        {
            "id": "topic_2",
            "title": "covid",
            "name": "Карантин",
            "emoji": "😷",
            "status": ""
        },
        {
            "id": "topic_3",
            "title": "road",
            "name": "Дорога",
            "emoji": "🚘",
            "status": ""
        },
        {
            "id": "topic_4",
            "title": "movie",
            "name": "Кино",
            "emoji": "🍿",
            "status": ""
        },
        {
            "id": "topic_5",
            "title": "fall",
            "name": "Осень",
            "emoji": "🍂",
            "status": ""
        },
        {
            "id": "topic_6",
            "title": "office",
            "name": "Офис",
            "emoji": "👔",
            "status": ""
        }
    ]);
    const [emotionsList, changeEmotion] = useState([
        {
            "id": "emotion_1",
            "title": "fun",
            "emoji": "😀",
            "status": ""
        },
        {
            "id": "emotion_2",
            "title": "sad",
            "emoji": "🙁️",
            "status": ""
        },
        {
            "id": "emotion_3",
            "title": "angry",
            "emoji": "😡",
            "status": ""
        },
        {
            "id": "emotion_4",
            "title": "work",
            "emoji": "🤓",
            "status": ""
        }
    ]);

    useEffect(() => {
        const storedMarks = postLocation.features;
        changeMarks(storedMarks);
        // Map(marks);
    }, [])

    function Map() {
        // console.log(marks);
        return (
            <GoogleMap
                defaultZoom={10}
                defaultCenter={{ lat: 55.72, lng: 37.57 }}
            >
                {marks.map(post => (
                    <Marker
                        key={post.properties.id}
                        position={{
                            lat: post.geometry.coordinates[0],
                            lng: post.geometry.coordinates[1]
                        }}
                        icon={{
                            url: post.properties.img_url,
                            scaledSize: new window.google.maps.Size(100, 100)
                        }}
                    />
                ))}
            </GoogleMap>
        );
    }
    const WrapperMap = withScriptjs(withGoogleMap(Map));

    function updateMap() {
        const topicFilter = topicsList.filter(topic => topic.status === 'selected');
        const emotionFilter = emotionsList.filter(emotion => emotion.status === 'selected');

        // console.log(topicFilter);
        // console.log(emotionFilter);

        let newMarks = [...postLocation.features];

        if (topicFilter.length) {
            newMarks = newMarks.filter(mark => mark.properties.topic_id === topicFilter[0].id);
        }
        if (emotionFilter.length) {
            newMarks = newMarks.filter(mark => mark.properties.emotion_id === emotionFilter[0].id);
        }

        changeMarks(newMarks);

        // console.log(newMarks);
    }

    function toggleTopic(topic_id) {
        const newList = [...topicsList]
        for (let i = 0; i < newList.length; i++) {
            if (newList[i].id === topic_id) {
                if (!newList[i].status) {
                    newList[i].status = "selected";
                } else {
                    newList[i].status = "";
                }
            } else {
                newList[i].status = "";
            }
        }
        changeTopic(newList);
        updateMap();
    }
    function toggleEmotion(emotion_id) {
        const newList = [...emotionsList]
        for (let i = 0; i < newList.length; i++) {
            if (newList[i].id === emotion_id) {
                if (!newList[i].status) {
                    newList[i].status = "selected";
                } else {
                    newList[i].status = "";
                }
            } else {
                newList[i].status = "";
            }
        }
        changeEmotion(newList);
        updateMap();
    }

    return (
        <div className='main-map-wrapper'>
            <div style={mapWrapper}>
                <WrapperMap
                    googleMapURL={`https://maps.googleapis.com/maps/api/js?key=AIzaSyAZLBZNBgq2sUtAuq5zoxp799VSVPETVbE`}
                    loadingElement={<div style={{height: '100%'}} />}
                    containerElement={<div style={{height: '100%'}} />}
                    mapElement={<div style={{height: '100%'}} />}
                />
            </div>
            <div className='emotions-selector-wrapper'>
                <Title level="3" style={{marginTop: 20, marginLeft: 12, marginBottom: 18}} weight="semibold">Поиск по теме или настроению</Title>
                <Separator />
                <Group header={<Header mode="secondary">Тема</Header>}>
                    <HorizontalScroll>
                        <div style={{ display: 'flex' }}>
                            {topicsList.map(topic => {
                                return <Topic key={topic.id} topic={topic} handleTopic={toggleTopic} />
                            })}
                        </div>
                    </HorizontalScroll>
                </Group>
                <Group style={{ paddingBottom: 8 }} header={<Header mode="secondary">Настроение</Header>}>
                    <HorizontalScroll style={{paddingLeft: 6}}>
                        <div style={{ display: 'flex' }}>
                            {emotionsList.map(emotion => {
                                return <Emotion key={emotion.id} emotion={emotion} handleEmotion={toggleEmotion} />
                            })}
                        </div>
                    </HorizontalScroll>
                </Group>
            </div>
        </div>
    );
}

export default MapView;
