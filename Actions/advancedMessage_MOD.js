// Actions/advancedMessage_MOD.js
module.exports = {
  data: { name: "Advanced Message Mod" },
  mod: "2.0",
  description: "Расширенное действие для отправки сообщений с поддержкой форматирования и медиафайлов. Позволяет отправлять текстовые сообщения с различными типами форматирования.",
  creator: "DevTeam",
  category: "Actions",
  UI: [
    { element: "largeInput", name: "Message Text", storeAs: "text", default: "" },
    { element: "menu", name: "Parse Mode", storeAs: "parseMode", default: "none", options: [
      { label: "None", value: "none" },
      { label: "HTML", value: "HTML" },
      { label: "Markdown", value: "Markdown" }
    ]},
    { element: "checkbox", name: "Disable Web Page Preview", storeAs: "disablePreview", default: false }
  ],
  async run(values, ctx, bridge) {
    const t = (s) => (bridge?.transf ? bridge.transf(s) : String(s ?? ""));
    const text = t(values.text || '');
    const parseMode = values.parseMode || 'none';
    const disablePreview = values.disablePreview || false;
    
    if (!text) {
      throw new Error("Message text is required");
    }
    
    return {
      __action: 'send-message',
      text: text,
      parseMode: parseMode === 'none' ? undefined : parseMode,
      disableWebPagePreview: disablePreview
    };
  }
};

