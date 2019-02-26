const Santa = ({
  handleNameInputChange,
  handleEmailInputChange,
  handleNemesisInputChange,
  addSantaToList
}) => (
  <div>
    <style jsx>{`
      input {
        width: 300px;
      }
    `}</style>
    <div>
      <label htmlFor="santaName">Santa Name: </label>
      <input
        type="text"
        id="santaName"
        name="santaName"
        onChange={handleNameInputChange}
      />
    </div>
    <div>
      <label htmlFor="santaEmail">Santa's Email: </label>
      <input
        type="email"
        id="santaEmail"
        name="santaEmail"
        onChange={handleEmailInputChange}
      />
    </div>
    <div>
      <label htmlFor="santaNemesis">Santas Nemesis:</label>
      <input
        type="text"
        id="santaNemesis"
        name="santaNemesis"
        onChange={handleNemesisInputChange}
      />
    </div>
    <button type="button" onClick={addSantaToList}>
      Add
    </button>
  </div>
);

export default Santa;
