// Actions/delayAction_MOD.js
module.exports = {
  data: { name: "Delay Action Mod" },
  mod: "1.5",
  description: "Действие для добавления задержки между выполнением действий. Полезно для создания пауз в последовательности действий или имитации человеческого поведения.",
  creator: "LikRus",
  category: "Actions",
  UI: [
    { element: "number", name: "Delay (seconds)", storeAs: "delay", default: 1, min: 0.1, max: 300 },
    { element: "checkbox", name: "Random Delay", storeAs: "random", default: false },
    { element: "number", name: "Max Delay (if random)", storeAs: "maxDelay", default: 5, min: 0.1, max: 300 }
  ],
  async run(values, ctx, bridge) {
    const delay = parseFloat(values.delay) || 1;
    const random = values.random || false;
    const maxDelay = parseFloat(values.maxDelay) || 5;
    
    let actualDelay = delay;
    if (random && maxDelay > delay) {
      actualDelay = delay + Math.random() * (maxDelay - delay);
    }
    
    // Возвращаем специальный объект для задержки
    return {
      __delay: actualDelay * 1000 // Конвертируем в миллисекунды
    };
  }
};

