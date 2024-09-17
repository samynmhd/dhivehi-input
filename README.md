# Dhivehi Input Handler

Dhivehi Input Handler is a simple npm package to enable Dhivehi language input (Thaana script) in text inputs or text areas on web pages. It ensures that the input is styled correctly (right-to-left and with the appropriate font) and maps keyboard keys to the Thaana script.

## Features

- Dhivehi Input Mapping: Automatically maps standard keyboard inputs to Dhivehi characters.
- Dynamic Integration: Works with React and Next.js applications without additional initialization.
- Custom Attribute Support: Use the `data-apply-thaana` attribute to apply Dhivehi input functionality to elements.
- Seamless integration with TinyMCE (haven't tested on other WYSIWYG editors)

## Installation

To install the dhivehi-input package, use npm or yarn:

    npm install dhivehi-input-handler

or

    yarn add dhivehi-input-handler

## Usage

To use the Dhivehi Input functionality in your project, follow these steps:

React

You can use the `dhivehi-input-handler` package in your React application by importing the package. The package will automatically set up the necessary functionality:

Import the `dhivehi-input-handler` package:

    import React from "react";
    import "dhivehi-input-handler";

    function App() {
        return (
          <div className="App">
            <textarea rows={5} cols={10} data-apply-thaana />
            <input type="text" data-apply-thaana />
          </div>
        );
    }
    export default App;

## Manual Initialization (Optional)

If you prefer to initialize manually, you can use the `initDhivehiInputObserver` function to start observing and applying Dhivehi input functionality:

Next.js

    "use client";
    import { initDhivehiInputObserver } from "dhivehi-input-handler";
    import { useEffect } from "react";

    export default function Home() {
      useEffect(() => {
        initDhivehiInputObserver();
      }, []);
      return (
        <div>
          <input type="text" data-apply-thaana />
          <textarea data-apply-thaana />
        </div>
      );
    }

# Integration with TinyMCE React

function ensures that content inside the contenteditable element (e.g., TinyMCE's editor body) is dynamically converted to Dhivehi while typing.

    import {applyDhivehiInput} from "dhivehi-input-handler"

    const handleInit = (evt, editor) => {
      const iframe = editor.getContentAreaContainer().querySelector("iframe");
      const editorBody = iframe.contentDocument.body;

      applyDhivehiInput(editorBody)
    }

## How It Works

- Attribute-Based Application: The library automatically applies Dhivehi input functionality to any element with the `data-apply-thaana` attribute.
- Automatic Setup: On import, the package sets up a `MutationObserver` to watch for new elements with the `data-apply-thaana` attribute and applies the necessary functionality.

## Key Mappings

The package includes a mapping for the Dhivehi (Thaana) keyboard layout. When users type on a standard keyboard, the corresponding Dhivehi characters are inserted.

## Font Usage

The Faruma font is included within the package and automatically applied to any input with the data-apply-thaana attribute. Ensure that your build process supports loading font files.

If needed, you can manually apply the font to any element using CSS:

    [data-apply-thaana] {
      font-family: "MV_Faruma", sans-serif;
      direction: rtl;
    }

## Customization

You can customize the appearance of the input fields by overriding the styles in your own CSS.

    input[data-apply-thaana],
    textarea[data-apply-thaana] {
      font-size: 16px;
      padding: 8px;
      color: #000;
      border: 1px solid #ccc;
    }
