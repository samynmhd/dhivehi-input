// Define the key mappings for Dhivehi
const dhivehiKeyMap: { [key: string]: string } = {
  a: "ަ",
  b: "ބ",
  c: "ޗ",
  d: "ދ",
  e: "ެ",
  f: "ފ",
  g: "ގ",
  h: "ހ",
  i: "ި",
  j: "ޖ",
  k: "ކ",
  l: "ލ",
  m: "މ",
  n: "ނ",
  o: "ޮ",
  p: "ޕ",
  q: "ް",
  r: "ރ",
  s: "ސ",
  t: "ތ",
  u: "ު",
  v: "ވ",
  w: "އ",
  // x: "",
  y: "ޔ",
  z: "ޒ",
  ",": "،",
  // ".": "ން",
  "?": "؟",
  "1": "1",
  "2": "2",
  "3": "3",
  "4": "4",
  "5": "5",
  "6": "6",
  "7": "7",
  "8": "8",
  "9": "9",
  "0": "10",
  //capital letters
  A: "ާ",
  B: "ޞ",
  C: "ޝ",
  D: "ޑ",
  E: "ޭ ",
  F: "ﷲ",
  G: "ޣ",
  H: "ޙ",
  I: "ީ",
  J: "ޛ",
  K: "ޚ",
  L: "ޅ",
  M: "ޟ",
  N: "ޏ",
  O: "ޯ",
  P: "÷",
  Q: "ޤ",
  R: "ޜ",
  S: "ށ",
  T: "ޓ",
  U: "ޫ",
  V: "ޥ",
  W: "ޢ",
  X: "ޘ",
  Y: "ޠ",
  Z: "ޡ",
};
// Function to handle input events and convert Latin characters to Dhivehi characters
function handleInput(event: Event): void {
  const inputElement = event.target as HTMLInputElement | HTMLTextAreaElement;
  const value = inputElement.value;

  // Check if the last character is mapped to a Dhivehi character
  const lastChar = value[value.length - 1];
  const mappedChar = dhivehiKeyMap[lastChar];

  if (mappedChar) {
    // Update the input value to replace the last character with the Dhivehi character
    inputElement.value = value.slice(0, -1) + mappedChar;
    inputElement.setSelectionRange(
      inputElement.value.length,
      inputElement.value.length
    );
  }
}

// Function to apply Dhivehi input functionality to an input element
export function applyDhivehiInput(
  inputElement: HTMLInputElement | HTMLTextAreaElement
): void {
  inputElement.classList.add("dhivehiFont");

  // Remove existing listeners to avoid multiple bindings
  inputElement.removeEventListener("input", handleInput);

  // Add input listener
  inputElement.addEventListener("input", handleInput);
}

//  Function to observe DOM changes and apply Dhivehi input to elements with 'applyDhivehiInput'

function observeDhivehiInputs(): void {
  // Look for any existing inputs with the 'applyDhivehiInput' attribute
  const inputs = document.querySelectorAll(
    "input[data-apply-thaana], textarea[data-apply-thaana]"
  ) as NodeListOf<HTMLInputElement | HTMLTextAreaElement>;

  // Apply Dhivehi input to each input element
  inputs.forEach((input) => {
    applyDhivehiInput(input);
  });

  // Create a new MutationObserver to observe changes in the DOM
  const observer = new MutationObserver((mutationList) => {
    mutationList.forEach((mutation) => {
      if (mutation.type === "childList") {
        mutation.addedNodes.forEach((node) => {
          if (node instanceof HTMLElement) {
            const inputs = node.querySelectorAll(
              "input[data-apply-thaana], textarea[data-apply-thaana]"
            ) as NodeListOf<HTMLInputElement | HTMLTextAreaElement>;
            inputs.forEach((input) => applyDhivehiInput(input));
          }
        });
      }

      // Check if the 'data-apply-thaana' attribute has been added to an input element
      if (
        mutation.type === "attributes" &&
        mutation.attributeName === "data-apply-thaana"
      ) {
        // Apply Dhivehi input to the input element
        const input = mutation.target as HTMLInputElement | HTMLTextAreaElement;
        applyDhivehiInput(input);
      }
    });
  });
  // Observe changes in the body and its subtree
  observer.observe(document.body, {
    attributes: true,
    childList: true,
    subtree: true,
  });
}

// Function to initialize the Dhivehi input observer
export function initDhivehiInputObserver(): void {
  if (typeof window !== "undefined" && typeof document !== "undefined") {
    // document.addEventListener("DOMContentLoaded", observeDhivehiInputs);
    observeDhivehiInputs();
  } else {
    console.log("Document or window is undefined, observer not set up");
  }
}
