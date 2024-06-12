document.addEventListener('DOMContentLoaded', function() {
    const inputs = document.querySelectorAll('#personalForm input, #personalForm select');
    inputs.forEach((input, index) => {
        input.addEventListener('keydown', function(event) {
            if (event.key === 'Enter') {
                event.preventDefault();
                const nextInput = inputs[index + 1];
                if (nextInput) {
                    nextInput.focus();
                } else {
                    document.querySelector('#personalForm button[type="submit"]').focus();
                }
            }
        });
    });
});

function addTask() {
    let inputTask = document.getElementById('tohobby').value
    let todoList = document.getElementById('hobbylist')


    let taskDiv = document.createElement('div')
    taskDiv.classList.add('Item')

    let taskText = document.createTextNode(inputTask)


    let deleteButton = document.createElement('button')
    deleteButton.innerText = ' X '
    deleteButton.classList.add('deletePart')


    deleteButton.addEventListener('click', (event) => {
        event.target.parentElement.remove()
    })

    taskDiv.appendChild(taskText)
    taskDiv.appendChild(deleteButton)
    todoList.appendChild(taskDiv)


}

document.querySelector('.calendar-icon').addEventListener('click', () => {
    document.getElementById('geburtsdatum').focus();
});