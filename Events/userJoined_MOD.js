// Events/userJoined_MOD.js
module.exports = {
  data: { name: "User Joined Event Mod", trigger: "userJoined" },
  mod: "1.3",
  description: "Событие для обработки входа пользователей в чат или группу. Позволяет приветствовать новых участников или выполнять действия при присоединении пользователя.",
  creator: "LikRus",
  category: "Events",
  UI: [
    { element: "checkbox", name: "Only New Members", storeAs: "onlyNew", default: true },
    { element: "checkbox", name: "Welcome Message", storeAs: "welcome", default: true },
    { element: "largeInput", name: "Welcome Text", storeAs: "welcomeText", default: "Добро пожаловать, {username}!" },
    { element: "actions", name: "Actions to Run", storeAs: "actions" }
  ],
  runtime({ events, helpers }) {
    if (!Array.isArray(events) || events.length === 0) return;
    helpers.markEventsHandled?.(events);

    helpers.onUserJoined?.((user, chatId, isNew) => {
      for (const ev of events) {
        try {
          const onlyNew = ev?.data?.onlyNew !== false;
          const welcome = ev?.data?.welcome !== false;
          const welcomeText = ev?.data?.welcomeText || 'Добро пожаловать!';
          
          if (onlyNew && !isNew) {
            continue;
          }
          
          const ctx = {
            api: helpers.bot?.api,
            user: user,
            chatId: chatId,
            isNew: isNew
          };
          
          // Отправляем приветственное сообщение, если нужно
          if (welcome && welcomeText) {
            const text = welcomeText
              .replace(/{username}/g, user.first_name || 'Пользователь')
              .replace(/{id}/g, user.id || '');
            
            helpers.bot?.api?.sendMessage?.(chatId, text).catch(console.error);
          }
          
          helpers.runEventActions(ev, ctx, { chatId: chatId });
        } catch (e) {
          console.error("[user joined mod error]", ev?.file || "unknown", e);
        }
      }
    });
  },
};

