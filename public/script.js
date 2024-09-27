document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('studentportal');

    form.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent the form from submitting the default way

        const formData = {
            rollno: document.getElementById('rollno').value.trim(),
            name: document.getElementById('name').value.trim(),
            email: document.getElementById('email').value.trim(),
            contact: document.getElementById('contact').value.trim(),
            address: document.getElementById('address').value.trim()
        };

        // Send data to your local server using POST method
        fetch('http://localhost:3000/submit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })
        .then(response => response.json())
        .then(data => {
            alert(data.message || 'Form submitted successfully!');
            console.log('Success:', data);
            form.reset(); // Clear the form after submission
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Failed to submit form. Please try again.');
        });
        form.reset();
    });
});


















// document.addEventListener('DOMContentLoaded', function() {
//     const form = document.getElementById('studentportal');
//     const formResponse = document.getElementById('formResponse');

//     form.addEventListener('submit', function(event) {
//         event.preventDefault(); // Prevent the form from submitting the default way

//         const formData = {
//             rollno: document.getElementById('rollno').value.trim(),
//             name: document.getElementById('name').value.trim(),
//             email: document.getElementById('email').value.trim(),
//             contact: document.getElementById('contact').value.trim(),
//             address: document.getElementById('address').value.trim()
//         };

//         // Send data to your local server using POST method
//         fetch('http://localhost:3000/submit', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify(formData)
//         })
//         .then(response => response.json())
//         .then(data => {
//             formResponse.textContent = 'Form submitted successfully!';
//             console.log('Success:', data);
//         })
//         .catch(error => {
//             formResponse.textContent = 'Failed to submit form. Please try again.';
//             console.error('Error:', error);
//         });
        
//         alert('Form submitted successfully!');
//         // Clear the form after submission
//         form.reset();
//     });
// });
















// document.addEventListener('DOMContentLoaded', function() {
//     const form = document.getElementById('contactForm');
//     const formResponse = document.getElementById('formResponse');

//     form.addEventListener('submit', function(event) {
//         event.preventDefault(); // Prevent the form from submitting the default way

//         const formData = {
//             name: document.getElementById('name').value.trim(),
//             email: document.getElementById('email').value.trim()
//         };

//         // Send data to your local server using POST method
//         fetch('http://localhost:3000/submit', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify(formData)
//         })
//         .then(response => response.json())
//         .then(data => {
//             formResponse.textContent = 'Form submitted successfully!';
//             console.log('Success:', data);
//         })
//         .catch(error => {
//             formResponse.textContent = 'Failed to submit form. Please try again.';
//             console.error('Error:', error);
//         });
//         alert('Form submitted successfully!');
//         // Clear the form after submission
//         form.reset();
//     });
// });