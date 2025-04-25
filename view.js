export const View = (() => {
    const listEl = document.querySelector("#goal-list .lists");

    const renderGoals = (goals) => {
        listEl.innerHTML = "";

        goals.forEach(goal => {
            const li = document.createElement("li");
            li.innerHTML = `
                ${goal.description} <span>${goal.category} (${goal.repetitions})</span>
                <button class="btn--delete" data-id="${goal.id}">Mark as achieved</button>
            `;
            listEl.appendChild(li);
        });
    };

    const clearForm = () => {
        document.querySelector("form").reset();
    };

    return {
        renderGoals,
        clearForm,
        listEl
    };
})();
