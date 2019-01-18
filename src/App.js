import React, { Component } from "react";
import MatchCard from "./components/BasketCard";
import Wrapper from "./components/Wrapper";
import Title from "./components/Title";
import matches from "./matchcards.json";
import "./App.css";

let correctClicks = 0;
let bestScore = 0;
let clickMessage = "Click the order of the Most Valuable Player but click a picture twice, you Lose!!";
class App extends Component {

    state = {
        matches,
        correctClicks,
        bestScore,
        clickMessage
    };

    setClicked = id => {

        const matches = this.state.matches;
        const clickedMatch = matches.filter(match => match.id === id);

        if (clickedMatch[0].clicked){

            console.log ("Correct Clicks: " + correctClicks);
            console.log ("Best Score: " + bestScore);

            correctClicks = 0;
            clickMessage = "He's has already been ranked! Game Over!"

            for (let i = 0 ; i < matches.length ; i++){
                matches[i].clicked = false;
            }

            this.setState({clickMessage});
            this.setState({ correctClicks });
            this.setState({matches});

        } else if (correctClicks < 12) {

            clickedMatch[0].clicked = true;
            correctClicks++;
            clickMessage = "You haven't clicked on that one yet, Keep going!";

            if (correctClicks > bestScore){
                bestScore = correctClicks;
                this.setState({ bestScore });
            }
           
            matches.sort(function(a, b){return 0.5 - Math.random()});
            this.setState({ matches });
            this.setState({correctClicks});
            this.setState({clickMessage});
        } else {

            clickedMatch[0].clicked = true;
            correctClicks = 0;
            clickMessage = "Nice you ranked them ALL!! Now, let's see if you changed your mind!";
            bestScore = 12;
            this.setState({ bestScore });
            
            for (let i = 0 ; i < matches.length ; i++){
                matches[i].clicked = false;
            }

    // while(currentBasketballArray.length > 0){
    //   const randVal = Math.floor(Math.random() * currentBasketballArray.length);
    //   const randObject = currentBasketabllArray.splice(randVal, 1)[0];
    //   newArray.push(randObject);
    // }
            matches.sort(function(a, b){return 0.5 - Math.random()});
            this.setState({ matches });
            this.setState({correctClicks});
            this.setState({clickMessage});

        }
    };

    render() {
        return (
            <Wrapper>
                <div className="header">
                <Title>Race to MVP!</Title>
                <br></br>
                </div>
                <h2 className="scoreSummary">
                    {this.state.clickMessage}
                </h2>
                
                <h3 className="scoreSummary">
                    Correct Clicks: {this.state.correctClicks} 
                    <br />
                    Best Score: {this.state.bestScore} 
                </h3>

                {this.state.matches.map(match => (
                    <MatchCard
                        setClicked={this.setClicked}
                        id={match.id}
                        key={match.id}
                        image={match.image}
                    />
                ))}
                
            </Wrapper>
        );
    }
}

export default App;
