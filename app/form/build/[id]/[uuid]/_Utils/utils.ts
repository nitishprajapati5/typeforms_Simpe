export const questionType = [
  {
    type: "Single Choice",
    useCases: [
      { label: "Text Field" },
      { label: "Multi Line/Text Area" },
      { label: "Email Field" },
      { label: "Number Field" },
      { label: "URL Field" },
    ],
  },
  {
    type: "Selection Components",
    useCases: [
      { label: "Drop Down" },
      { label: "Radio Buttons" },
      { label: "Check Boxes" },
    ],
  },
  {
    type: "Date and Time Components",
    useCases: [{ label: "Date Picker" }, { label: "Date and Time Picker" }],
  },
  {
    type: "File and Media Inputs",
    useCases: [{ label: "File Upload" }, { label: "Image Upload" }],
  },
];

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const questionConfigMap: Record<string, any> = {
  "Text Field": {
    placeholder: "Enter your answer",
    type: "text",
  },
  "Multi Line/Text Area": {
    placeholder: "Enter detailed answer",
    type: "textarea",
    rows: 4,
  },
  "Email Field": {
    placeholder: "example@email.com",
    type: "email",
  },
  "Number Field": {
    placeholder: "Enter number",
    type: "number",
  },
  "URL Field": {
    placeholder: "https://example.com",
    type: "url",
  },
  "Radio Buttons": {
    options: ["Option 1", "Option 2", "Option 3"],
  },
  "Check Boxes": {
    options: ["Option 1", "Option 2", "Option 3"],
  },
  "Drop Down": {
    options: ["Option 1", "Option 2", "Option 3"],
  },
  "Date Picker": {
    type: "date",
  },
  "Date and Time Picker": {
    type: "datetime-local",
  },
  "File Upload": {
    type: "file",
  },
  "Image Upload": {
    type: "file",
    accept: "image/*",
  },
};

export const themes = [
    {
      "id": "blue",
      "label": "Blue",
      "base": "#1A73E8",
      "shades": [
        "#E8F0FE",
        "#D2E3FC",
        "#AECBFA",
        "#8AB4F8",
        "#669DF6",
        "#4285F4",
        "#1A73E8",
        "#1967D2",
        "#174EA6"
      ]
    },
    {
      "id": "purple",
      "label": "Purple",
      "base": "#9334E6",
      "shades": [
        "#F3E8FD",
        "#E9D2FD",
        "#D7AEFB",
        "#C58AF9",
        "#AF5CF7",
        "#9334E6",
        "#7E22CE",
        "#6B21A8"
      ]
    },
    {
      "id": "pink",
      "label": "Pink",
      "base": "#D93025",
      "shades": [
        "#FCE8E6",
        "#FAD2CF",
        "#F6AEA9",
        "#F28B82",
        "#EA4335",
        "#D93025",
        "#C5221F",
        "#A50E0E"
      ]
    },
    {
      "id": "red",
      "label": "Red",
      "base": "#C5221F",
      "shades": [
        "#FCE8E6",
        "#FAD2CF",
        "#F6AEA9",
        "#EA4335",
        "#D93025",
        "#C5221F",
        "#A50E0E"
      ]
    },
    {
      "id": "orange",
      "label": "Orange",
      "base": "#FA7B17",
      "shades": [
        "#FEEFE3",
        "#FDE3C8",
        "#FBCFA2",
        "#F9AB00",
        "#FA7B17",
        "#E37400",
        "#C26401"
      ]
    },
    {
      "id": "yellow",
      "label": "Yellow",
      "base": "#F9AB00",
      "shades": [
        "#FEF7E0",
        "#FEEFC3",
        "#FDE293",
        "#FDD663",
        "#F9AB00",
        "#E37400"
      ]
    },
    {
      "id": "green",
      "label": "Green",
      "base": "#1E8E3E",
      "shades": [
        "#E6F4EA",
        "#CEEAD6",
        "#A8DAB5",
        "#81C995",
        "#34A853",
        "#1E8E3E",
        "#137333"
      ]
    },
    {
      "id": "teal",
      "label": "Teal",
      "base": "#129EAF",
      "shades": [
        "#E0F7FA",
        "#B2EBF2",
        "#80DEEA",
        "#4DD0E1",
        "#26C6DA",
        "#129EAF",
        "#0B7285"
      ]
    },
    {
      "id": "cyan",
      "label": "Cyan",
      "base": "#00ACC1",
      "shades": [
        "#E0F7FA",
        "#B2EBF2",
        "#80DEEA",
        "#4DD0E1",
        "#26C6DA",
        "#00ACC1",
        "#00838F"
      ]
    },
    {
      "id": "gray",
      "label": "Gray",
      "base": "#5F6368",
      "shades": [
        "#F1F3F4",
        "#E8EAED",
        "#DADCE0",
        "#BDC1C6",
        "#9AA0A6",
        "#5F6368",
        "#3C4043"
      ]
    }
  ]

