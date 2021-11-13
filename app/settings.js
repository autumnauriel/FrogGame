import {Main} from "./Main.js"

let button = document.createElement('button')
button.style = 'position: absolute; bottom: 0; right: 0; z-index: 1;'
button.innerHTML = 'Connect Device'
document.body.insertAdjacentElement('beforebegin', button)

export const settings = {
  name: "Derpy Frog",
  devices: [
    "EEG"
  ],
  author: "Autumn Auriel",
  description: "Collect as many flies as you can!",
  categories: [
    "train"
  ],
  graphs: [
    {
      nodes: [
        {
          name: "blink_left",
          class: "Event",
          "params": {
            "keycode": "Space"
          },
        },
        {
          name: "blink_right",
          class: "Event",
          params: {
            "keycode": "Space"
          },
        },
        {
          name: "ui",
          class: Main,
          params: {},
        },
        {
          name: "document",
          class: "DOM",
          params: {},
        }
      ],
      edges: [
        {
          source: 'blink_left',
          target: 'ui:jump'
        },
        {
          source: 'blink_right',
          target: 'ui:jump'
        },
        {
          source: 'ui:element',
          target: 'document:content'
        },
      ]
    }
  ],
  "version": "0.0.38",
  "connect": {
    toggle: button
  }
};