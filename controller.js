import { APIs } from './api.js';
import { Model } from './model.js';
import { View } from './view.js';

const Controller = (() => {
    
    const state = new Model.State()
    console.log("this is a state",state)

    const init = () => {
        state.subscribe(() => {
            View.renderGoals(state.goals);
        });

        // Get goals
        APIs.getGoals()
            .then((goalsFromServer) => {
                state.goals = goalsFromServer;
            });

        // Form handler
        const form = document.querySelector("form");
        form.addEventListener("submit", (e) => {
            e.preventDefault();

            const description = document.getElementById("description").value;
            const categorySelect = document.getElementById("category");
            const category = categorySelect.options[categorySelect.selectedIndex].text;
            const repetitions = document.getElementById("repetitions").value;

            const newGoal = {
                description,
                category,
                repetitions,
                achieved: false,
            };

            APIs.createGoal(newGoal)
                .then((createdGoal) => {
                    state.addGoal(createdGoal);
                    View.clearForm();
                });
        });

        // Delete handler
        View.listEl.addEventListener("click", (e) => {
            if (e.target.classList.contains("btn--delete")) {
                const id = e.target.dataset.id;
                console.log('this is the string', e.target.dataset.id);
                APIs.deleteGoal(id)
                    .then(() => {
                        state.deleteGoal(Number(id));
                    });
            }
        });
    };

    return { init };
})();

Controller.init();
