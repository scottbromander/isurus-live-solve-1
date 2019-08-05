const employeeArray = [];
let monthlySalaries = 0;
let overBudget = false;

$(document).ready(init);

function init() {
    $('.js-btn-submit').on('click', addEmployee);
    $('.js-container').on('click', '.js-btn-delete', deleteEmployee);
    render();
}

function addEmployee() {
    const newEmployee = {
        firstName: $('.js-input-first-name').val(),
        lastName: $('.js-input-last-name').val(),
        employeeId: $('.js-input-id').val(),
        employeeTitle: $('.js-input-title').val(),
        employeeSalary: parseInt($('.js-input-salary').val()),
    }

    employeeArray.push(newEmployee);

    $('.js-input-first-name').val('');
    $('.js-input-last-name').val('');
    $('.js-input-id').val('');
    $('.js-input-title').val('');
    $('.js-input-salary').val('');

    calcMonthly();
    render();
}

function render() {
    if (monthlySalaries >= 20000) {
        overBudget = true;
    } else {
        overBudget = false;
    }

    $('.js-monthly-salary').text(monthlySalaries);

    if (overBudget) {
        $('.js-monthly-salary').addClass('over');
    } else {
        $('.js-monthly-salary').removeClass('over');
    }

    for (let employee of employeeArray) {
        renderEmployee(employee);
    }
}

function renderEmployee(employee) {
    $('.js-container').append(`
        <div>
            <p>${employee.firstName}</p>
            <p>${employee.lastName}</p>
            <p>${employee.employeeId}</p>
            <p>${employee.employeeTitle}</p>
            <p>${employee.employeeSalary}</p>
            <button class="js-btn-delete">DELETE</button>
        </div>
    `);
}

function calcMonthly() {
    monthlySalaries = 0;
    let annualSalary = 0;
    for (let employee of employeeArray) {
        annualSalary += employee.employeeSalary;
    }
    monthlySalaries = annualSalary / 12;
}

function deleteEmployee() {
    $(this).parent().remove();
}