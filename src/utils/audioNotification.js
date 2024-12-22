import Notify from "../assets/sounds/notification.mp3";

export const playAudioNotification = () => {
  const audio = new Audio(Notify);
  console.log("audio", audio);
  audio
    .play()
    .then(() => {
      console.log("Audio played successfully");
    })
    .catch((error) => {
      console.error("Audio playback failed:", error);
    });
};
