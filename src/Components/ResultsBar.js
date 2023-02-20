//Modules
import firebase from "./Firebase";
import { get, ref, getDatabase  } from "firebase/database";
import { useState } from "react";
import ProgressBar from "@ramonak/react-progress-bar";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";

const ResultsBar = () => {
  //firebase key
  const {boothID} = useParams();
  // initialize database content
  const database = getDatabase(firebase);
  //defining State
  const [pollQuestion, setPollQuestion] = useState("");
  const [optionOneDescription, setOptionOneDescription] = useState("");
  const [votesOne, setVotesOne] = useState(0);
  const [optionTwoDescription, setOptionTwoDescription] = useState("");
  const [votesTwo, setVotesTwo] = useState(0);
  const [totalVotes, setTotalVotes] = useState();
  const [voteOnePercent, setVoteOnePercent] = useState();
  const [voteTwoPercent, setVoteTwoPercent] = useState();
  //database reference
  const dbRef = ref(database, `/${boothID}`);

  //taking a snapshot of the database
  get(dbRef).then((snapshot) => {
    if (snapshot.exists()) {
      setPollQuestion(snapshot.val().pollQuestion);
      setOptionOneDescription(snapshot.val().pollOptionOne.optionOneDescription);
      setVotesOne(snapshot.val().pollOptionOne.votes);
      setOptionTwoDescription(snapshot.val().pollOptionTwo.optionTwoDescription);
      setVotesTwo(snapshot.val().pollOptionTwo.votes);
      setTotalVotes(snapshot.val().totalVotes);

      //function to calculate % of votes
      const voteCounting = function getPercentA(x, y) {
        if (x >=1 || y >= 1){
          return Math.round((x / (x + y)) * 100);  
        } else {
          Swal.fire("No votes yet!");
          //0 is passed to vote percentage to avoid undefined or NaN
          setVoteOnePercent(0);
          setVoteTwoPercent(0);
        }
      };
      //ensuring vote one or two has data before passing into useState
      const vote = voteCounting(votesOne, votesTwo); 
      const voteTwo = voteCounting(votesTwo, votesOne); 
      if (vote >=1 || voteTwo >=1) {
        setVoteOnePercent(vote, voteTwo);
        setVoteTwoPercent(voteTwo, vote);
      };

    //if snapshot does not exist:
    } else {
      Swal.fire("No data available");
    }
  }).catch(() => {
    Swal.fire("Sorry, an error has occurred.");
  });

  return (
    <>
      <h2 className="results-bar-h2">Poll Question: {pollQuestion}</h2>
      <h3 className="results-bar-h3">Total Votes: {totalVotes}</h3>
      <section className="progress-bars-container">
        <div className="progress-bar-one">
          <p className="results-bar-p"> <p className="results-option">{optionOneDescription}</p> has {voteOnePercent}% of the vote.</p>
          <ProgressBar completed={voteOnePercent} bgColor="#E54F6D" />
        </div>
        <div className="progress-bar-two">
          <p className="results-bar-p"> <p className="results-option">{optionTwoDescription}</p> has {voteTwoPercent}% of the vote.</p>
          <ProgressBar completed={voteTwoPercent} 
          bgColor="#724E91"/>
        </div>
      </section>
    </>
  );
};

export default ResultsBar;

// Progress bar courtesy of
// https://dev.to/ramonak/react-how-to-create-a-custom-progress-bar-component-in-5-minutes-2lcl