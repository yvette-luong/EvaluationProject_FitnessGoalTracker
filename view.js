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

    //show marked message
    const showMessage = (text) => {  
        const messageEl = document.getElementById('message');
        if (!messageEl) return; // if no message div, skip

        messageEl.textContent = text;
        messageEl.style.display = 'block';

        setTimeout(() => {
            messageEl.style.display = 'none';
        }, 2000);
    };

    return {
        renderGoals,
        clearForm,
        listEl, 
        showMessage
    };
})();
