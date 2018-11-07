const Santa = ({
  handleNameInputChange,
  handleEmailInputChange,
  handleNemesisInputChange,
  addSantaToList
}) => (
  <div>
    <div>
      <label>
        Santa Name:{" "}
        <input type="text" name="santaName" onChange={handleNameInputChange} />
      </label>
    </div>
    <div>
      <label>
        Santa's Email:{" "}
        <input
          type="email"
          name="santaEmail"
          onChange={handleEmailInputChange}
        />
      </label>
    </div>
    <div>
      <label>
        Santas Nemesis:{" "}
        <input
          type="text"
          name="santaNemesis"
          onChange={handleNemesisInputChange}
        />
      </label>
    </div>
    <button type="button" onClick={addSantaToList}>
      Add
    </button>
  </div>
);

export default Santa;
