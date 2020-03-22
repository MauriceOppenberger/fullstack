const timeConverter = timeToConvert => {
  const time = new Date(timeToConvert).toUTCString().split(" ");
  time.splice(time.length - 1, 1);
  const convertedTime = time.join(" ");
  return convertedTime;
};
export default timeConverter;
