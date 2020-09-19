import React from 'react';
import Emoji from 'a11y-react-emoji'

const mainTopicWrapper = {
    flexShrink: 0,
    width: 76,
    height: 76,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    fontSize: 12,
};

const topicWrapper = {
    position: 'relative',
    display: 'inline-block',
    cursor: 'pointer'
};

const topicImage = {
    width: 48,
    height: 48,
    border: '.5px solid rgba(0,0,0,.14)',
    borderRadius: 48,
    backgroundColor: '#fff',
    position: 'relative',
    textAlign: 'center',
    lineHeight: '48px'
};
const topicEmoji = {
    fontSize: 24,
}

const topicTitle = {
    fontSize: 12,
    textAlign: 'center',
    marginTop: 5
};


function Topic({ topic, handleTopic }) {

    function handleTopicClick() {
        handleTopic(topic.id);
    }

    return (
        <div style={mainTopicWrapper}>
            <div className='topic' style={topicWrapper} onClick={handleTopicClick}>
                <div className='topic-image' data-status={topic.status} style={topicImage}>
                    <Emoji symbol={topic.emoji} style={topicEmoji} />
                </div>
                <div className='topic-title' style={topicTitle}>{topic.name}</div>
            </div>
        </div>
    );
}

export default Topic;