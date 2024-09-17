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

// function handle contentEditable elements
export function handleContentEditable(element: HTMLElement): void {
  const nodes = element.childNodes;

  nodes.forEach((node) => {
    if (node.nodeType === Node.TEXT_NODE) {
      const text = node.textContent || "";

      // Create a range to track the caret position
      const selection = element.ownerDocument?.getSelection();
      let caretPosition = text.length; // Default caret to end if no selection

      // Check if there's a valid selection and it's within our element
      if (selection && selection.rangeCount > 0) {
        const currentRange = selection.getRangeAt(0);
        if (currentRange.startContainer === node) {
          caretPosition = currentRange.startOffset; // Get current caret position
        }
      }

      // Replace Latin characters with Dhivehi characters
      const updatedText = text
        .split("")
        .map((char) => dhivehiKeyMap[char] || char)
        .join("");

      if (updatedText !== text) {
        node.textContent = updatedText;

        // Restore the caret position after modifying the text
        const newRange = document.createRange();
        const newSelection = element.ownerDocument?.getSelection();

        // Ensure caret position doesn't exceed the new text length
        const newCaretPosition = Math.min(caretPosition, updatedText.length);

        if (newSelection) {
          newRange.setStart(node, newCaretPosition);
          newRange.collapse(true);
          newSelection.removeAllRanges();
          newSelection.addRange(newRange);
        }
      }
    } else if (node.nodeType === Node.ELEMENT_NODE) {
      handleContentEditable(node as HTMLElement);
    }
  });
}

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

  // Handle contentEditable elements
  if (inputElement.isContentEditable) {
    inputElement.addEventListener("input", () =>
      handleContentEditable(inputElement)
    );
    return;
  }

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
