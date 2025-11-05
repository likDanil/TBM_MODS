// Actions/conditionalLogic_MOD.js
module.exports = {
  data: { name: "Conditional Logic Mod" },
  mod: "2.1",
  description: "Мощное действие для создания условной логики. Позволяет выполнять различные действия в зависимости от условий и значений переменных.",
  creator: "DevTeam",
  category: "Actions",
  UI: [
    { element: "vars-select", name: "Variable A", storeAs: "varA", type: "any" },
    { element: "menu", name: "Operator", storeAs: "operator", default: "equals", options: [
      { label: "Equals", value: "equals" },
      { label: "Not Equals", value: "notEquals" },
      { label: "Greater Than", value: "greater" },
      { label: "Less Than", value: "less" },
      { label: "Contains", value: "contains" },
      { label: "Starts With", value: "startsWith" },
      { label: "Ends With", value: "endsWith" }
    ]},
    { element: "vars-select", name: "Variable B", storeAs: "varB", type: "any" },
    { element: "input", name: "Value (if not variable)", storeAs: "value", default: "" },
    { element: "actions", name: "Actions if True", storeAs: "actionsTrue" },
    { element: "actions", name: "Actions if False", storeAs: "actionsFalse" }
  ],
  async run(values, ctx, bridge) {
    const varA = values.varA;
    const varB = values.varB;
    const operator = values.operator || 'equals';
    const value = values.value || '';
    
    let valueA = '';
    let valueB = value;
    
    // Получаем значения переменных
    if (varA && ctx?.vars) {
      valueA = String(ctx.vars.temp[varA] || ctx.vars.chat[varA] || ctx.vars.glob[varA] || '');
    }
    
    if (varB && ctx?.vars) {
      valueB = String(ctx.vars.temp[varB] || ctx.vars.chat[varB] || ctx.vars.glob[varB] || value);
    }
    
    // Выполняем сравнение
    let result = false;
    switch (operator) {
      case 'equals':
        result = valueA === valueB;
        break;
      case 'notEquals':
        result = valueA !== valueB;
        break;
      case 'greater':
        result = parseFloat(valueA) > parseFloat(valueB);
        break;
      case 'less':
        result = parseFloat(valueA) < parseFloat(valueB);
        break;
      case 'contains':
        result = valueA.includes(valueB);
        break;
      case 'startsWith':
        result = valueA.startsWith(valueB);
        break;
      case 'endsWith':
        result = valueA.endsWith(valueB);
        break;
    }
    
    return {
      __condition_result: result,
      conditionData: {
        actionType: 'conditional',
        actionsTrue: values.actionsTrue || [],
        actionsFalse: values.actionsFalse || []
      }
    };
  }
};

