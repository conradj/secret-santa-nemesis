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
            width: 100vw;
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
        <div>
          {santaList.length > 0 &&
            santaList.map(santa => (
              <div className="santaListItem" key={santa.name}>
                <div>
                  🎅 {santa.name} {santa.email}
                </div>
                <div>☃️ {santa.nemesis}</div>
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
        <button
          type="button"
          className="button button-primary"
          onClick={() => this.submitSantas()}
        >
          Click Here to allocate and send santas
        </button>
        {encodedResults.length > 0 && (
          <>
            <h2>Messages sent 🛷 </h2>
            <ul style={{ listStyle: "none" }}>
              {encodedResults.map(({ from, to }) => (
                <li key={from}>
                  from: <strong>{from}</strong> to:{" "}
                  <a
                    href={`https://www.browserling.com/tools/base64-decode?input=${to}`}
                    target="_blank"
                  >
                    (click to decode)
                  </a>
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
    );
  }
}
