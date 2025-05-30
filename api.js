export const APIs = (() => {

    const baseURL = "http://localhost:3000/goals";

    const getGoals = () => {
        return fetch(baseURL).then((res) => res.json());
    };

    const createGoal = (newGoal) => {
        return fetch(baseURL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newGoal),
        }).then((res) => res.json());
    }

    const deleteGoal = (id) => {
        return fetch(`${baseURL}/${String(id)}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
        }).then((res) => {
            if (!res.ok) {
                throw new Error(`Failed to delete goal with id ${id}`);
            }
            return; 
        });
    };

    const updateGoal = (id, updatedGoal) => {
        return fetch(`${baseURL}/${String(id)}`, {
            method: "PATCH", 
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedGoal),
        }).then((res) => {
            if (!res.ok) {
                throw new Error(`Failed to update goal with id ${id}`);
            }
            return res.json();
        });
    };
    

    return { getGoals, createGoal, deleteGoal, updateGoal };

})();