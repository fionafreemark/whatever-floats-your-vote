import CreatePoll from "./CreatePoll";
import FindPoll from "./FindPoll";
import { Link } from "react-router-dom";
import HomeGraphic from "../assets/voting-home-graphic-border.svg"

function Home() {
    return (
        <>
        <div className="header-h1">
        <h2>Whatever Floats Your Vote</h2>
        </div>
            <section className="home-section">

                <div className="home-graphic">
                    <img src={HomeGraphic} alt="Illustration of people putting a ballot into a voting box." />
                </div>
                <div className="home-button-box">
                <Link to={`/createpoll`} element={<CreatePoll />} className="button primary"> Create A Poll</Link>
                <Link to={`/findpoll`} element={<FindPoll />} className="button secondary"> Find A Poll</Link>
                </div>
            </section>
        </>
    )
}

export default Home;