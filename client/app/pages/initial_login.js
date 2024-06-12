document.addEventListener('DOMContentLoaded', () => {
    const links = document.querySelectorAll('nav ul li a');
    const sections = document.querySelectorAll('section');

    links.forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault();
            const targetSection = event.target.getAttribute('data-section');

            sections.forEach(section => {
                if (section.id === targetSection) {
                    section.classList.add('active');
                } else {
                    section.classList.remove('active');
                }
            });
        });
    });
});


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



    taskDiv.addEventListener('click', (event) => {
        event.target.remove()
    })

    taskDiv.appendChild(taskText)
    todoList.appendChild(taskDiv)


}

document.querySelector('.calendar-icon').addEventListener('click', () => {
    document.getElementById('geburtsdatum').focus();
});

document.getElementById('profile-picture-input').addEventListener('change', function(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            document.getElementById('profile-picture').src = e.target.result;
        }
        reader.readAsDataURL(file);
    }
});


function deaktivateacc() {
    const deactivate = document.getElementById("deaktivate")
    deactivate.addEventListener('click', (event) =>{
        window.location.href = 'deactivated_window.html';
    })
}



