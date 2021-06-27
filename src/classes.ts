abstract class Department {
    // private readonly id: string;
    // private name: string;
    static readonly fiscalYear = 2021;
    protected employees: string[] = [];

    constructor(protected readonly id: string, public name: string) {
        // this.id = id;
        // this.name = n;
        console.log(Department.fiscalYear)
    }

    static createEmployee(name: string) {
        return { name }
    }

    // Abstract method will not have any implementations
    // It should be present inside abstract class
    // Implementations of abstract will be in inheriting classes

    abstract describe(this: Department): void;

    // describe(this: Department) {
    //     console.log(`Department (${this.id}): ${this.name}`);
    // }

    addEmployee(employee: string) {
        // validation etc
        // this.id = 'd2';
        this.employees.push(employee);
    }

    printEmployeeInformation() {
        console.log(this.employees.length);
        console.log(this.employees);
    }
}

class ITDepartment extends Department {
    admins: string[];
    // ITDepartment constructor
    constructor(id: string, admins: string[]) {
        // when ever you add your own constructor in a class that inherits 
        // from another class then you should super in inheriting classes(child classes)

        // constructor Department(id: string, name: string): Department
        super(id, 'IT'); // calls the constructor of base class
        //  first call super then add this keyword
        this.admins = admins;
    }

    describe() {
        console.log(`${this.name} Department - ID: ${this.id}`);
    }
}

class AccountingDepartment extends Department {
    private lastReport: string;
    private static instance: AccountingDepartment;
    // 
    get mostRecentReport(): string {
        // has to return something
        if (this.lastReport) {
            return this.lastReport;
        }
        throw new Error('No report found.')
    }
    set mostRecentReport(value: string) {
        if (!value) {
            throw new Error('Please pass in a valid value!')
        }
        this.addReport(value);
    }

    // we can call new on this (new AccountingDepartment('d2', []))
    private constructor(id: string, private reports: string[]) {
        super(id, 'Accounting');
        this.lastReport = reports[0];
    }

    static getInstance() {
        if (AccountingDepartment.instance) {
            return this.instance;
        }
        // private constructor call since we are inside the class
        this.instance = new AccountingDepartment('d2', []);
        return this.instance;
    }

    addReport(text: string) {
        this.reports.push(text);
        this.lastReport = text;
    }

    describe() {
        console.log(`${this.name} Depoartment - ID ${this.id}`);
    }

    // overrideing
    addEmployee(name: string) {
        if (name === 'Max') {
            return;
        }
        this.employees.push(name)
    }

    printReports() {
        console.log(this.reports);
    }
}

const employee1 = Department.createEmployee('Manish');

console.log(employee1, Department.fiscalYear);


const it = new ITDepartment('d1', ['Max']);

it.addEmployee('Max');
it.addEmployee('Manu');

// it.employees[2] = 'Anna';

it.describe();
it.name = 'NEW NAME';
it.printEmployeeInformation();

console.log(it);

// its is private constructor
// const accounting = new AccountingDepartment('d2', []);
// const accounting2 = new AccountingDepartment('d1', []);
const accounting = AccountingDepartment.getInstance()
const accounting2 = AccountingDepartment.getInstance()

console.log(accounting, accounting2);


accounting.mostRecentReport = 'Year end report';
accounting.addReport('Something went wrong...');
console.log(accounting.mostRecentReport) // 

accounting.addEmployee('Max');
accounting.addEmployee('Manish');

// accounting.printReports();
// accounting.printReports();
// accounting.printEmployeeInformation();

accounting.describe();

  // const accountingCopy = { name: 'DUMMY', describe: accounting.describe };

  // accountingCopy.describe();