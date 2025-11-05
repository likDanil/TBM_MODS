// Events/messageReceived_MOD.js
module.exports = {
  data: { name: "Message Received Event Mod", trigger: "messageReceived" },
  mod: "1.2",
  description: "Расширенное событие для обработки входящих сообщений. Позволяет реагировать на различные типы сообщений и выполнять действия на основе содержимого.",
  creator: "DevTeam",
  category: "Events",
  UI: [
    { element: "menu", name: "Message Type", storeAs: "messageType", default: "any", options: [
      { label: "Any", value: "any" },
      { label: "Text", value: "text" },
      { label: "Photo", value: "photo" },
      { label: "Document", value: "document" },
      { label: "Video", value: "video" }
    ]},
    { element: "input", name: "Filter Text (optional)", storeAs: "filterText", default: "" },
    { element: "checkbox", name: "Case Sensitive", storeAs: "caseSensitive", default: false },
    { element: "actions", name: "Actions to Run", storeAs: "actions" }
  ],
  runtime({ events, helpers }) {
    if (!Array.isArray(events) || events.length === 0) return;
    helpers.markEventsHandled?.(events);

    helpers.onMessageReceived?.((message) => {
      for (const ev of events) {
        try {
          const messageType = ev?.data?.messageType || 'any';
          const filterText = ev?.data?.filterText || '';
          const caseSensitive = ev?.data?.caseSensitive || false;
          
          // Проверка типа сообщения
          if (messageType !== 'any') {
            const hasType = message.photo || message.document || message.video || message.text;
            if (!hasType || (messageType === 'text' && !message.text) ||
                (messageType === 'photo' && !message.photo) ||
                (messageType === 'document' && !message.document) ||
                (messageType === 'video' && !message.video)) {
              continue;
            }
          }
          
          // Проверка фильтра текста
          if (filterText && message.text) {
            const text = caseSensitive ? message.text : message.text.toLowerCase();
            const filter = caseSensitive ? filterText : filterText.toLowerCase();
            if (!text.includes(filter)) {
              continue;
            }
          }
          
          const ctx = {
            api: helpers.bot?.api,
            message: message,
            chatId: message.chat?.id
          };
          
          helpers.runEventActions(ev, ctx, { chatId: message.chat?.id });
        } catch (e) {
          console.error("[message received mod error]", ev?.file || "unknown", e);
        }
      }
    });
  },
};

