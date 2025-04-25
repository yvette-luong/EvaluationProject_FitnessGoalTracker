import { APIs } from "./api";

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
      const getGoals = () => APIs.getGoals();
      const createGoal = (newGoal) => APIs.createGoal(newGoal);
      const deleteGoal = (id) => APIs.deleteGoal(id);

      return {State, getGoals, createGoal, deleteGoal}
})