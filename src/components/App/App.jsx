import React from 'react';
import ChallengeSection from '../ChallengeSection/ChallengeSection';
import Footer from '../Footer/Footer';
import Landing from '../Landing/Landing';
import Nav from '../NavBar/Nav';
import './App.css';
import { SAMPLE_PARAGRAPHS } from "./../../data/sampleParagraph";

const TotalTime = 2;
const DefaultState = {
    selectedParagraph: "",
    timerStarted: false,
    timeRemaining: TotalTime,
    words: 0,
    characters: 0,
    wpm: 0,
    testInfo: []
};

class App extends React.Component 
{  
    state = DefaultState;

    fetchNewParagraphFallBack = () => {
        const data = SAMPLE_PARAGRAPHS[
            Math.floor(Math.random() * SAMPLE_PARAGRAPHS.length)
        ];

        const selectedParagraphArray = data.split("");
        const testInfo = selectedParagraphArray.map((selectedLetter) => {
            return {
                    testLetter: selectedLetter,
                    status: "notAttempted",
                };
        });

        this.setState({...DefaultState, testInfo, selectedParagraph: data});
    };

    fetchNewParagraph = () => {
        fetch("http://metaphorpsum.com/paragraphs/1/9")
        .then((response) => response.text())
        .then((data) => {
                const selectedParagraphArray = data.split("");
                const testInfo = selectedParagraphArray.map((selectedLetter) => {
                    return {
                        testLetter: selectedLetter,
                        status: "notAttempted",
                    };
                }
            );

            this.setState({...DefaultState, testInfo, selectedParagraph: data});
        });
    };

    componentDidMount() {
        this.fetchNewParagraphFallBack(); 
    };

    startAgain = () => this.fetchNewParagraphFallBack();

    startTimer = () => {
        this.setState({timerStarted: true});
        const timer = setInterval(() => {
            if(this.state.timeRemaining > 0){
                // Change the WPM and Time Remaining
                const timeSpent = TotalTime - this.state.timeRemaining;     
                const wpm = timeSpent > 0
                    ? (this.state.words / timeSpent) * TotalTime
                    : 0; 
                this.setState({
                    timeRemaining: this.state.timeRemaining - 1,
                    wpm: parseInt(wpm),
                });
            }
            else{
                clearInterval(timer);
            }
        }, 1000);
    };

    handleUserInput = (inputValue) => {
        if(!this.state.timerStarted) this.startTimer();

        // ! Algorithm
        // / 1. Handle the underflow case - all the characters should be shown as not-attempted - to exit
        // / 2. Handle the Overflow case - early exit
        // / 3. Handle the backspqce 
        //      - Mark the [index + 1] element as not-Attempted (irrespective of whether the index is less than zero)
        //      - But, don't forget to check for the overflow case here.
        //       (index + 1 --> out of bound , when index === length - 1)
        // / 4. Update the status in the test info
        //   - Find out the last character in the  inputvalue and it's index
        //   - Check of the character at same index in testinfo (state) matches
        //   - If it matches , Yes -> "correct"
        //   - if it doesn't match, NO -> "incorrect"
        // / 5. Irrespective of the case, characters, words, and speed (wpm) can be update
    
        const characters = inputValue.length;
        const words = inputValue.split(" ").length;
        const index = characters-1;

        if(index < 0){
            this.setState({
                testInfo: [
                    {
                        testLetter: this.state.testInfo[0].testLetter,
                        status: "notAttempted",
                    },
                    ...this.state.testInfo.slice(1),
                ],
                characters,
                words
            });

            return;
        }

        // - Handling Overflow case
        if(index >= this.state.selectedParagraph.length)
        {
            this.setState({characters, words});
            return;
        }

        // / 3. Handling this logic of algorithm
        // ' Make a copy of testInfo
        const testInfo = this.state.testInfo;  
        if(!(index === this.state.selectedParagraph.length - 1))
            testInfo[index + 1].status = "notAttempted";

        // ' Check for the correct typed letter
        const isCorrect = inputValue[index] === testInfo[index].testLetter;

        // ' Update the testInfo
        testInfo[index].status = isCorrect ? "correct" : "incorrect";
    
        // ' Update the state
        this.setState({
            testInfo,
            words,
            characters
        });
    };


    render()
    {
        return (
            <div className="app">
                {/* Nav Section */}
                <Nav />
                {/* Landing Page */}
                <Landing />
                {/* Challenge Section*/}
                <ChallengeSection 
                    selectedParagraph = {this.state.selectedParagraph}
                    words={this.state.words}
                    characters={this.state.characters}
                    wpm={this.state.wpm}
                    timeRemaining={this.state.timeRemaining}
                    timerStarted={this.state.timerStarted}
                    testInfo = {this.state.testInfo}
                    onInputChange={this.handleUserInput}
                    startAgain = {this.startAgain}
                />
                {/* Footer */}
                <Footer />
            </div>
        );
    }
}

export default App;