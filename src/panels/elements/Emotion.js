import React from 'react';
import Emoji from 'a11y-react-emoji'

const emotionWrapper = {
    flexShrink: 0,
    width: 40,
    height: 46,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    fontSize: 12,
}

const topicEmotion = {
    width: 30,
    height: 30,
    border: '.5px solid rgba(0,0,0,0.05)',
    borderRadius: 30,
    dropShadow: '0 2px 4px 0 rgba(0,0,0,0.08)',
    textAlign: 'center',
    lineHeight: '30px',
    backgroundColor: '#fff',
    cursor: 'pointer'
};
const emotionEmoji = {
    fontSize: 26,
}



function Emotion({ emotion, handleEmotion }) {

    function handleEmotionClick() {
        handleEmotion(emotion.id);
    }

    return (
        <div key={emotion.id} style={emotionWrapper} onClick={handleEmotionClick}>
            <div
                className='emotion'
                data-status={emotion.status}
                style={topicEmotion}
            >
                <Emoji
                    symbol={emotion.emoji}
                    style={emotionEmoji}
                />
            </div>
        </div>
    );
}

export default Emotion;
