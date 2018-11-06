var restartCount = 0;
const allocateSantas = santaList => {
  let restart = false;
  const allocated = [];
  let allocatedSantas = santaList.map(santa => {
    const potentialRecipients = santaList
      .filter(
        recipient =>
          recipient.name !== santa.name &&
          recipient.name !== santa.nemesis &&
          !allocated.includes(recipient.name)
      )
      .map(recipient => recipient.name);

    const recipient =
      potentialRecipients[
        Math.floor(Math.random() * potentialRecipients.length)
      ];
    if (recipient === undefined) {
      restart = true;
    }
    allocated.push(recipient);

    return {
      from: santa.name,
      to: recipient
    };
  });

  if (restart) {
    restartCount++;

    if (restartCount > 10) {
      return new Error("No valid santa allocation possible ☹️");
    }
    allocatedSantas = allocateSantas(santaList);
  }

  return allocatedSantas;
};

module.exports = allocateSantas;
