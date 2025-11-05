// Actions/testAction_MOD.js
module.exports = {
  data: { name: "Test Action Mod" },
  mod: "1.1",
  description: "Тестовое действие для проверки мод-менеджера. Это действие можно использовать для тестирования функциональности модов.",
  creator: "LikRus",
  category: "Actions",
  UI: [
    { element: "input", name: "Test Input", storeAs: "testInput", default: "" },
    { element: "textarea", name: "Test Textarea", storeAs: "testTextarea", default: "" }
  ],
  async run(values, ctx, bridge) {
    const t = (s) => (bridge?.transf ? bridge.transf(s) : String(s ?? ""));
    const testInput = t(values.testInput || '');
    const testTextarea = t(values.testTextarea || '');
    
    // Простое тестовое действие
    console.log('[Test Action Mod]', { testInput, testTextarea });
    
    return { success: true, testInput, testTextarea };
  }
};
