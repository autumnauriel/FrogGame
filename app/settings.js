import {Main} from "./Main.js"

export const settings = {
  name: "Derpy Frog",
  devices: [
    "EEG"
  ],
  author: "Autumn Auriel",
  description: "Collect as many flies as you can!",
  instructions: "",
  categories: [
    "play"
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
};