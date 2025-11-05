// Events/testEvent_MOD.js
module.exports = {
  data: { name: "Test Event Mod", trigger: "testEvent" },
  mod: "1.0",
  description: "Тестовое событие для проверки мод-менеджера. Это событие можно использовать для тестирования функциональности модов.",
  creator: "LikRus",
  category: "Events",
  UI: [
    { element: "input", name: "Event Parameter", storeAs: "param", default: "" },
    { element: "actions", name: "Actions to Run", storeAs: "actions" }
  ],
  runtime({ events, helpers }) {
    if (!Array.isArray(events) || events.length === 0) return;
    helpers.markEventsHandled?.(events);

    // Тестовое событие - просто логирует информацию
    console.log('[Test Event Mod] Events registered:', events.length);
    
    // Пример обработчика тестового события
    helpers.onTestEvent?.(async (data) => {
      for (const ev of events) {
        try {
          const param = ev?.data?.param || '';
          const ctx = {
            api: helpers.bot?.api,
            testData: data
          };
          
          await helpers.runEventActions(ev, ctx, { chatId: "test" });
        } catch (e) {
          console.error("[test event mod error]", ev?.file || "unknown", e);
        }
      }
    });
  },
};

