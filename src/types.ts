/**
 * npm start and other terminal tsc -w
 * Intercestions allows us to combines other types
 */

// interface Admin {
//     name: string;
//     privileges: string[];
// };

// interface Employee {
//     name: string;
//     startDate: Date;
// }

// interface ElevatedEmployee extends Admin, Employee { }
// // type ElevatedEmployee = Admin & Employee;

// const emp1: ElevatedEmployee = {
//     name: 'Manish',
//     privileges: ['create-server'],
//     startDate: new Date()
// }

// ** using types **

type Admin = {
    name: string;
    privileges: string[];
}

type Employee = {
    name: string;
    startDate: Date;
}

// combinations of Admin & Employee
type ElevatedEmployee = Admin & Employee;

const emp1: ElevatedEmployee = {
    name: 'Manish',
    privileges: ['create-server'],
    startDate: new Date()
}

type Combinable = string | number;
type Numeric = number | boolean;

type Universal = Combinable & Numeric;

// function overloads
function addNum(num1: number, num2: number): number;
function addNum(num1: string, num2: string): string;

function addNum(num1: Combinable, num2: Combinable) {
    // type guard
    if (typeof num1 === 'string' || typeof num2 === 'string') {
        return num1.toString() + num2.toString();
    }
    return num1 + num2;
}


// const result = addNum(1, 5);
const resultString = addNum('Manish', 'Verma');
resultString.split(' ');

const fetchedUserData = {
    id: 'u1',
    name: 'Manish',
    // job: { title: 'CEO', description: 'My own company' }
};

// in js we need to check
// console.log(fetchedUserData.job && fetchedUserData.job.title); // CEO
// console.log(fetchedUserData?.job?.title); // CEO

const userInput = '';
const storedData = userInput || 'Default'; // Default

const userInputN = null;
const userInputU = undefined;
// if this is null or undefined and not an empty string
const storedDataNU = userInputN ?? 'Default'; // Default


// addNum(1,false) // !! Error !!

// or , union type (combine all)
type UnKnownEmployee = Employee | Admin;

function printEmployeeInformation(emp: UnKnownEmployee) {
    console.log(`Name: ${emp.name}`)
    if ('privileges' in emp) {
        console.log(`privileges: ${emp.privileges}`)
    }
    if ('startDate' in emp) {
        console.log(`start Date: ${emp.startDate}`)
    }
}

printEmployeeInformation(emp1);
printEmployeeInformation({ name: 'Manish', startDate: new Date() });


class Car {
    drive() {
        console.log(`Driving a car...`);
    }
}
class Truck {
    drive() {
        console.log(`Driving a truck...`);
    }

    loadCargo(amount: number) {
        console.log(`Loading cargo: ${amount}`);
    }
}

// union type
type Vehicle = Car | Truck

const vehicle1 = new Car();
const vehicle2 = new Truck();

function useVehicle(vehicle: Vehicle) {
    vehicle.drive();
    // if ('loadCargo' in vehicle) {
    //     vehicle.loadCargo(1000);
    // }
    // type guard
    if (vehicle instanceof Truck) {
        vehicle.loadCargo(1000);
    }
}


useVehicle(vehicle1);
useVehicle(vehicle2);

// Discriminated Unions

interface Bird {
    type: 'bird' // literal type
    flyingSpeed: number;
}
interface Horse {
    type: 'horse' // literal type
    runningSpeed: number;
}

type Animal = Bird | Horse;

function moveAnimal(animal: Animal) {
    // if( animal instanceof Animal) // !! Error 
    // if ('runningSpeed' in animal) {
    //     console.log(`Moving with speed ${animal.runningSpeed}`);
    // }

    let speed;
    switch (animal.type) {
        case 'bird':
            speed = animal.flyingSpeed
            break;
        case 'horse':
            speed = animal.runningSpeed
            break;

        default:
            break;
    }
    console.log(`Moving at speed: ${speed}`);

}

moveAnimal({ type: 'horse', runningSpeed: 70 })

// const paragraph = document.querySelector('p');
const paragraph = document.getElementById('message-output');

// const userInputElement = <HTMLInputElement>document.getElementById('user-input')!;
// ! this indicates that it will never yield null
const userInputElement = document.getElementById('user-input')! as HTMLInputElement;

userInputElement.value = 'Hi there!';

interface ErrorContainer {
    [prop: string]: string | number | boolean;
}

const errorBag: ErrorContainer = {
    // we can have multiple properties here
    email: 'Not a valid email',
    username: 'Must start with a capital letter!',
    id: 233,
    status: true
}