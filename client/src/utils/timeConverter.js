// convert creation date to human readable string
const timeConverter = timeToConvert => {
  const time = new Date(timeToConvert).toUTCString().split(" ");
  //Remove GMT from converted time string
  time.splice(time.length - 1, 1);
  const convertedTime = time.join(" ");
  return convertedTime;
};
export default timeConverter;
