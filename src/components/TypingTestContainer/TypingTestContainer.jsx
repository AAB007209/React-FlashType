import React from 'react';
import ChallengeDetailsCard from "../ChallengeDetailsCard/ChallengeDetailsCard";
import TypingChallenge from '../TypingChallenge/TypingChallenge';
import './TypingTestContainer.css';
const TypingTestContainer = ({selectedParagraph, words, characters, wpm, timeRemaining, timerStarted, testInfo, onInputChange}) =>
{
    return (
        <div className="typing-challenge-container">
            {/* Details Section */}
            <div className="details-container">
                {/* Words typed */}
                <ChallengeDetailsCard cardName = "words" cardValue = {words} />
                {/* Characters typed */}
                <ChallengeDetailsCard cardName = "Characters" cardValue = {characters} />
                {/* Speed */}
                <ChallengeDetailsCard cardName = "Speed" cardValue = {wpm} />
            </div>


            {/* The Real Challenge*/}
            <div className="typewriter-container">
                <TypingChallenge
                onInputChange = {onInputChange} 
                testInfo = {testInfo}
                timeRemaining={timeRemaining} timerStarted={timerStarted} selectedParagraph = {selectedParagraph} />
            </div>

        </div>
    );
}

export default TypingTestContainer;