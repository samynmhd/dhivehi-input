declare module "dhivehi-input" {
  export function initDhivehiInputObserver(): void;

  export function applyDhivehiInput(
    inputElement: HTMLInputElement | HTMLTextAreaElement
  ): void;
}
