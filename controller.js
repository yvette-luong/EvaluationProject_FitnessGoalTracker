import { APIs } from './api.js';
import { Model } from './model.js';
import { View } from './view.js';


const Controller = (() => {
    const state = new Model.State();
    console.log("State created:", state);

    const init = () => {
        // re-render goals whenever state updates
        state.subscribe(() => {
            View.renderGoals(state.goals);
        });

        // Load oals from server
        APIs.getGoals()
            .then((goalsFromServer) => {
                state.goals = goalsFromServer; 
            })
            .catch((error) => {
                console.error("Error fetching goals:", error);
            });

        // Handle form submission
        const form = document.querySelector("form");
        form.addEventListener("submit", (e) => {
            e.preventDefault(); // Prevent page reload

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
                    state.addGoal(createdGoal); // Update state with the newly created goal
                    View.clearForm(); // Clear form after submit
                })
                .catch((error) => {
                    console.error("Error creating new goal:", error);
                });
        });

        // Handle delete goal
        View.listEl.addEventListener("click", async (e) => {
            if (e.target.classList.contains("btn--delete")) {
                const id = e.target.dataset.id;
                try {
                    // Update the goal to achieved
                    const updatedGoal = { achieved: true };
        
                    await APIs.updateGoal(id, updatedGoal);
        
                    // Update frontend state manually
                    const updatedGoals = state.goals.map(goal =>
                        Number(goal.id) === Number(id) ? { ...goal, achieved: true } : goal
                    );
                    state.goals = updatedGoals; 
                    View.showMessage("You just completed a goal!");

                } catch (error) {
                    console.error("Error marking goal as achieved:", error);
                }
            }
        });
    };

    return { init };
})();


Controller.init();
