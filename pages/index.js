import Head from "next/head";
import "../skeleton.css";
import SantaList from "../components/SantaList";
const Index = () => (
  <div>
    <Head>
      <title>Secret santa for distributed families</title>
    </Head>
    <style jsx>{`
      .container {
        margin: 4rem;
      }
    `}</style>
    <div className="container">
      <h1>Welcome...to Secret Santa Nemesis!</h1>
      <p>Hello Secret 🐿️ Santa 🎅 administrator 🤓.</p>
      <p>
        A Nemesis is someone your santa doesn't want to get a secret santa gift
        for such as their MORTAL ENEMY 👹 (or maybe their beloved 💍 partner 😍
        who they are already getting a nice pressie for).
      </p>
      <h2>Provide your santas</h2>
      <SantaList />
    </div>
  </div>
);

export default Index;
