document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('employee-form');
    const table = document.getElementById('employee-table');
  
    // Function to add a new employee
    const addEmployee = employee => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${employee.name}</td>
        <td>${employee.email}</td>
        <td>${employee.position}</td>
      `;
      table.querySelector('tbody').appendChild(row);
    };
  
    // Function to fetch and display the employee list
    const fetchEmployees = () => {
      fetch('http://localhost:8080/employees')
        .then(response => response.json())
        .then(data => {
          data.forEach(employee => addEmployee(employee));
        })
        .catch(error => {
          console.error('Error fetching employees:', error);
        });
    };
  
    // Add event listener to the form
    form.addEventListener('submit', event => {
      event.preventDefault();
  
      const formData = new FormData(form);
      const employeeData = Object.fromEntries(formData.entries());
  
      fetch('http://localhost:8080/employees', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(employeeData)
      })
        .then(response => {
          if (response.ok) {
            return response.json();
          } else {
            throw new Error('Error adding employee');
          }
        })
        .then(employee => {
          addEmployee(employee);
          form.reset();
        })
        .catch(error => {
          console.error('Error adding employee:', error);
        });
    });
  
    // Fetch and display the initial employee list
    fetchEmployees();
  });
  