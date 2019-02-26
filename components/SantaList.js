import React from "react";
import axios from "axios";
import Santa from "./Santa";

export default class extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      newSantaName: "",
      newSantanemesis: "",
      newSantaEmail: "",
      santaList: [],
      encodedResults: []
    };
  }
  static async getInitialProps({ req }) {
    const userAgent = req ? req.headers["user-agent"] : navigator.userAgent;
    return { userAgent };
  }

  handleNameInputChange(event) {
    const target = event.target;
    const value = target.value;

    this.setState({
      newSantaName: value
    });
  }

  handleEmailInputChange(event) {
    const target = event.target;
    const value = target.value;

    this.setState({
      newSantaEmail: value
    });
  }

  handleNemesisInputChange(event) {
    const target = event.target;
    const value = target.value;

    this.setState({
      newSantaNemesis: value
    });
  }

  addSantaToList() {
    const {
      newSantaName,
      newSantaNemesis,
      newSantaEmail,
      santaList
    } = this.state;
    console.log(
      santaList,
      newSantaName,
      santaList.some(
        santa => santa.name.toLowerCase() === newSantaName.toLowerCase()
      )
    );
    if (
      !santaList.some(
        santa => santa.name.toLowerCase() === newSantaName.toLowerCase()
      )
    ) {
      const newSantaList = [
        { name: newSantaName, email: newSantaEmail, nemesis: newSantaNemesis },
        ...santaList
      ];
      this.setState({
        santaList: newSantaList
      });
    } else {
      alert(`${newSantaName} is already a 🎅`);
    }
  }

  deleteSanta(santaName) {
    const { santaList } = this.state;

    this.setState({
      santaList: santaList.filter(santa => santa.name !== santaName)
    });
  }

  submitSantas = async () => {
    const { santaList } = this.state;

    try {
      const {
        data: { emailResults, encodedResults }
      } = await axios.post("/api/send", {
        santaList
      });
      console.log(emailResults);
      this.setState({ encodedResults });
    } catch (error) {
      console.log("merrrorr", error);
    }
  };

  render() {
    const { santaList, encodedResults } = this.state;
    return (
      <div>
        <style jsx>{`
          .santaListItem {
            display: grid;
            grid-template-columns: 4fr 2fr 1fr;
          }

          .emailContent {
            width: 100%;
            height: 250px;
          }

          .button-large {
            font-size: 3rem;
          }
        `}</style>
        <form>
          <Santa
            addSantaToList={() => this.addSantaToList()}
            handleNameInputChange={e => this.handleNameInputChange(e)}
            handleEmailInputChange={e => this.handleEmailInputChange(e)}
            handleNemesisInputChange={e => this.handleNemesisInputChange(e)}
          />
        </form>
        {santaList.length > 0 && (
          <div>
            <div>
              <h2>List of Santas</h2>
              {santaList.map(santa => (
                <div className="santaListItem" key={santa.name}>
                  <div>
                    <p>
                      🎅 {santa.name} {santa.email}
                    </p>
                  </div>
                  <div>
                    <p>☃️ {santa.nemesis}</p>
                  </div>
                  <div>
                    <a
                      href="#"
                      type="button"
                      onClick={() => this.deleteSanta(santa.name)}
                    >
                      Remove
                    </a>
                  </div>
                </div>
              ))}
            </div>
            <h3>Email text</h3>
            <textarea
              className="emailContent"
              defaultValue="🎅 Ho ho ho! Merry Christmas! 🎅

              Someone has been chosen to get you a gift; and *you* have been chosen to gift [NAME]!

              For Christmas Extravaganza 2018, we've set a budget of £50 💰

              Remember to wrap your present 🎁 in a way that no-one can guess who it is from and sneak it under the tree 🎄 when you get to your hosts 👨‍👩‍👧

              Secret 🕵️‍♂️ Santa 🎅 is more fun if you can keep it a complete secret, so do your best! 🍾

              Lots of love, the elves 🧝🧝‍🧝‍ xxx"
            />
            <div>
              <h3>Ready?</h3>
              <p>
                Hit the sledge when you're ready to randomly assign secret
                santas and email them!
              </p>
              <button
                type="button"
                className="button button-primary button-large"
                onClick={() => this.submitSantas()}
              >
                🛷
              </button>
            </div>
          </div>
        )}
        {encodedResults.length > 0 && (
          <React.Frament>
            <h2>Messages sent 🛷 </h2>
            <ul style={{ listStyle: "none" }}>
              {encodedResults.map(({ from, to }) => (
                <li key={from}>
                  from: <strong>{from}</strong> to:{" "}
                  <a
                    href={`https://www.browserling.com/tools/base64-decode?input=${to}`}
                    target="_blank"
                  >
                    {to} (click to decode)
                  </a>
                </li>
              ))}
            </ul>
          </React.Frament>
        )}
      </div>
    );
  }
}
