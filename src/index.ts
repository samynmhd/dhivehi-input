import {
  applyDhivehiInput,
  initDhivehiInputObserver,
  handleContentEditable,
} from "./keyMapping";
import "../styles/fonts.css";
// import "../fonts/Faruma.ttf";

// Automatically initialize the Dhivehi input observer when the library is imported
initDhivehiInputObserver();

export { applyDhivehiInput, initDhivehiInputObserver, handleContentEditable };
