// Actions/randomChoice_MOD.js
module.exports = {
  data: { name: "Random Choice Mod" },
  mod: "1.0",
  description: "Действие для случайного выбора одного из вариантов. Позволяет создавать случайные ответы или действия на основе списка опций.",
  creator: "TestUser",
  category: "Actions",
  UI: [
    { element: "repeater", name: "Choices", storeAs: "choices", title: "${item.text || 'Choice ' + (index + 1)}", item: [
      { element: "input", name: "Text", storeAs: "text", default: "" },
      { element: "number", name: "Weight (probability)", storeAs: "weight", default: 1, min: 0.1 }
    ]},
    { element: "vars-picker", name: "Store Result As", storeAs: "storeAs" }
  ],
  async run(values, ctx, bridge) {
    const choices = Array.isArray(values.choices) ? values.choices : [];
    
    if (choices.length === 0) {
      throw new Error("At least one choice is required");
    }
    
    // Вычисляем веса
    const weights = choices.map(c => parseFloat(c.weight) || 1);
    const totalWeight = weights.reduce((sum, w) => sum + w, 0);
    
    // Случайный выбор на основе весов
    let random = Math.random() * totalWeight;
    let selectedIndex = 0;
    
    for (let i = 0; i < weights.length; i++) {
      random -= weights[i];
      if (random <= 0) {
        selectedIndex = i;
        break;
      }
    }
    
    const selected = choices[selectedIndex];
    const result = selected?.text || '';
    
    // Сохраняем результат в переменную, если указано
    if (values.storeAs && ctx?.vars) {
      ctx.vars.temp[values.storeAs] = result;
    }
    
    return { result: result, selectedIndex: selectedIndex };
  }
};

