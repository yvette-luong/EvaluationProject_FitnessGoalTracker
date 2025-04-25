// import { APIs } from './api.js'; 

export const Model = (() => {
  class State {
    #goals = [];
    #onChange = () => {};

    get goals() {
      return this.#goals;
    }

    set goals(newGoals) {
      this.#goals = newGoals;
      this.#onChange();
    }

    addGoal(newGoal) {
      this.goals = [...this.goals, newGoal];
    }

    deleteGoal(id) {
      this.goals = this.goals.filter((goal) => goal.id !== id);
    }

    subscribe(cb) {
      this.#onChange = cb;
    }
  }

  const getGoals = async () => await APIs.getGoals();
  const createGoal = async (newGoal) => await APIs.createGoal(newGoal);
  const deleteGoal = async (id) => await APIs.deleteGoal(id);

  const modelObject = { State, getGoals, createGoal, deleteGoal };
  console.log('Model inside model.js:', modelObject); 
  return modelObject;
})();
