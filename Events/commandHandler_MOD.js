// Events/commandHandler_MOD.js
module.exports = {
  data: { name: "Command Handler Event Mod", trigger: "commandHandler" },
  mod: "1.0",
  description: "Универсальный обработчик команд для бота. Позволяет создавать кастомные команды с параметрами и обработкой аргументов.",
  creator: "TestUser",
  category: "Events",
  UI: [
    { element: "input", name: "Command Name", storeAs: "command", default: "", placeholder: "e.g., /start, /help" },
    { element: "checkbox", name: "Require Arguments", storeAs: "requireArgs", default: false },
    { element: "number", name: "Min Arguments", storeAs: "minArgs", default: 0, min: 0 },
    { element: "number", name: "Max Arguments", storeAs: "maxArgs", default: 10, min: 0 },
    { element: "actions", name: "Actions to Run", storeAs: "actions" }
  ],
  runtime({ events, helpers }) {
    if (!Array.isArray(events) || events.length === 0) return;
    helpers.markEventsHandled?.(events);

    helpers.onCommand?.((command, args, message) => {
      for (const ev of events) {
        try {
          const cmdName = (ev?.data?.command || '').trim().toLowerCase().replace(/^\//, '');
          const requireArgs = ev?.data?.requireArgs || false;
          const minArgs = parseInt(ev?.data?.minArgs) || 0;
          const maxArgs = parseInt(ev?.data?.maxArgs) || 10;
          
          if (!cmdName || command.toLowerCase() !== cmdName) {
            continue;
          }
          
          // Проверка аргументов
          if (requireArgs && (!args || args.length === 0)) {
            continue;
          }
          
          if (args && (args.length < minArgs || args.length > maxArgs)) {
            continue;
          }
          
          const ctx = {
            api: helpers.bot?.api,
            command: command,
            args: args || [],
            message: message,
            chatId: message?.chat?.id
          };
          
          helpers.runEventActions(ev, ctx, { chatId: message?.chat?.id });
        } catch (e) {
          console.error("[command handler mod error]", ev?.file || "unknown", e);
        }
      }
    });
  },
};

