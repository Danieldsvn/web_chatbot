
export const arrayStringToArrayObjects = (payLoad) => {
  return payLoad.map((history) => {
    return history.split('\n').filter(Boolean).map((line) => {
      const [sender, content] = line.split(': ');
      return {sender, content};
    });
  });
};

