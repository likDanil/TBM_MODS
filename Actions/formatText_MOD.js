// Actions/formatText_MOD.js
module.exports = {
  data: { name: "Format Text Mod" },
  mod: "1.8",
  description: "Действие для форматирования текста различными способами. Поддерживает преобразование регистра, обрезку, замену и другие операции с текстом.",
  creator: "DevTeam",
  category: "Actions",
  UI: [
    { element: "vars-select", name: "Input Variable", storeAs: "inputVar", type: "any" },
    { element: "menu", name: "Operation", storeAs: "operation", default: "uppercase", options: [
      { label: "Uppercase", value: "uppercase" },
      { label: "Lowercase", value: "lowercase" },
      { label: "Capitalize", value: "capitalize" },
      { label: "Trim", value: "trim" },
      { label: "Reverse", value: "reverse" }
    ]},
    { element: "number", name: "Max Length (0 = no limit)", storeAs: "maxLength", default: 0, min: 0 },
    { element: "vars-picker", name: "Store Result As", storeAs: "storeAs" }
  ],
  async run(values, ctx, bridge) {
    const t = (s) => (bridge?.transf ? bridge.transf(s) : String(s ?? ""));
    const inputVar = values.inputVar;
    const operation = values.operation || 'uppercase';
    const maxLength = parseInt(values.maxLength) || 0;
    
    let text = '';
    if (inputVar && ctx?.vars) {
      text = String(ctx.vars.temp[inputVar] || ctx.vars.chat[inputVar] || ctx.vars.glob[inputVar] || '');
    }
    
    // Применяем операцию
    switch (operation) {
      case 'uppercase':
        text = text.toUpperCase();
        break;
      case 'lowercase':
        text = text.toLowerCase();
        break;
      case 'capitalize':
        text = text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
        break;
      case 'trim':
        text = text.trim();
        break;
      case 'reverse':
        text = text.split('').reverse().join('');
        break;
    }
    
    // Обрезаем, если нужно
    if (maxLength > 0 && text.length > maxLength) {
      text = text.substring(0, maxLength);
    }
    
    // Сохраняем результат
    if (values.storeAs && ctx?.vars) {
      ctx.vars.temp[values.storeAs] = text;
    }
    
    return { result: text };
  }
};

