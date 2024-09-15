<h1>Dhivehi Input Handler</h1>

Dhivehi Input Handler is a simple npm package to enable Dhivehi language input (Thaana script) in text inputs or text areas on web pages. It ensures that the input is styled correctly (right-to-left and with the appropriate font) and maps keyboard keys to the Thaana script.

<h3>Features</h3>

<ul>
  <li>Dhivehi Input Mapping: Automatically maps standard keyboard inputs to Dhivehi characters.</li>
  <li>Dynamic Integration: Works with React and Next.js applications without additional initialization.</li>
  <li>Custom Attribute Support: Use the <code>data-apply-thaana</code> attribute to apply Dhivehi input functionality to elements.</li>
</ul>

<h3>Installation</h3>

To install the dhivehi-input package, use npm or yarn:

    npm install dhivehi-input-handler

or

    yarn add dhivehi-input-handler

<h3>Usage</h3>

To use the Dhivehi Input functionality in your project, follow these steps:

React

You can use the <code>dhivehi-input-handler</code> package in your React application by importing the package. The package will automatically set up the necessary functionality:

Import the <code>dhivehi-input-handler</code> package:

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

<h3>Manual Initialization (Optional)</h3>
If you prefer to initialize manually, you can use the <code>initDhivehiInputObserver</code> function to start observing and applying Dhivehi input functionality:
  
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

<h3>How It Works</h3>
<ul>
  <li>Attribute-Based Application: The library automatically applies Dhivehi input functionality to any element with the <code>data-apply-thaana</code> attribute.</li>
  <li>Automatic Setup: On import, the package sets up a <code>MutationObserver</code> to watch for new elements with the <code>data-apply-thaana</code> attribute and applies the necessary functionality.</li>
</ul>

<h3>Key Mappings</h3>

The package includes a mapping for the Dhivehi (Thaana) keyboard layout. When users type on a standard keyboard, the corresponding Dhivehi characters are inserted.

<h3>Font Usage</h3>

The MV_Faruma font is included within the package and automatically applied to any input with the data-apply-thaana attribute. Ensure that your build process supports loading font files.

If needed, you can manually apply the font to any element using CSS:

    [data-apply-thaana] {
      font-family: "MV_Faruma", sans-serif;
      direction: rtl;
    }

<h3>Customization</h3>

You can customize the appearance of the input fields by overriding the styles in your own CSS.

    input[data-apply-thaana],
    textarea[data-apply-thaana] {
      font-size: 16px;
      padding: 8px;
      color: #000;
      border: 1px solid #ccc;
    }
