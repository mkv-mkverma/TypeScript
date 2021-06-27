// Decorators
// Decoratorsare just a function
// A func you apply to something, for example, to a class in a certain way.

function Logger(logString: string) {
    console.log('LOGGER FACTORY');
    return function (constructor: Function) {
        console.log('Rendering Logger');
        console.log(logString);
        console.log(constructor);
    }
}

function WithTemplate(template: string, hookId: string) {
    // I know this argument but i dont need it then use _
    console.log('TEMPLATE FACTORY');
    return function <T extends { new(...args: any[]): { name: string } }>(originalConstructor: T) {

        return class extends originalConstructor {
            constructor(..._: any[]) {
                super();
                console.log('Rendering template');
                const hookEL = document.getElementById(hookId);
                // const personClass = new originalConstructor();
                if (hookEL) {
                    hookEL.innerHTML = template;
                    hookEL.querySelector('span')!.textContent = this.name;
                }
            }
        }

    }
}

// @Logger('LOGGING - PERSON')
@WithTemplate('<h1>LOGGING - PERSON</h1> <span></span>', 'app')
class PersonClass {
    name = 'Manish'
    constructor() {
        console.log('Creating persons object....');
    }
}

// const persons = new PersonClass();
// console.log(persons);


function Log(target: any, propertyName: string | Symbol) {
    console.log('Property decorator!');
    console.log(target);
    console.log(propertyName);
}

function Log2(target: any, name: string | Symbol, descriptor: PropertyDescriptor) {
    console.log('Accessor decorator!');
    console.log(target);
    console.log(name);
    console.log(descriptor);
}

function Log3(target: any, name: string | Symbol, descriptor: PropertyDescriptor) {
    console.log('Method decorator!');
    console.log(target);
    console.log(name);
    console.log(descriptor);
}

function Log4(target: any, nameOfMethod: string | Symbol, position: number) {
    console.log('Parameter decorator!');
    console.log(target);
    console.log(nameOfMethod);
    console.log(position);
}

class Product {
    @Log

    @Log2
    set price(value: number) {
        if (value > 0) {
            this._price = value;
        } else {
            throw new Error("Invalid price - should be positive")
        }
    }

    constructor(public title: string, private _price: number) { }

    @Log3
    getPriceWithTax(@Log4 tax: number) {
        return (this._price * (1 + tax));
    }
}

const p1 = new Product('Book 1', 19);
const p2 = new Product('Book 2', 29);

function AutoBind(_target: any, _methodName: string | Symbol, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;

    const adjDescriptor: PropertyDescriptor = {
        configurable: true,
        enumerable: true,
        get() {
            const boundFnc = originalMethod.bind(this)
            return boundFnc;
        }
    }
    return adjDescriptor;
}

class Printer {
    message = 'This works!'

    @AutoBind
    showMessage() {
        console.log(this.message);

    }
}

const printer = new Printer();

const button = document.querySelector('button')! as HTMLButtonElement;
// button.addEventListener('click', printer.showMessage.bind(printer)) // This works!
button.addEventListener('click', printer.showMessage)


interface ValidatorConfig {
    [property: string]: {
        [validatableProp: string]: string[] // ['required','positive']
    }
}

const registeredValidators: ValidatorConfig = {};

function Required(target: any, propName: string) {
    registeredValidators[target.constructor.name] = {
        ...registeredValidators[target.constructor.name],
        [propName]: [...registeredValidators[target.constructor.name][propName], 'required']
    };
}

function PositiveNumber(target: any, propName: string) {
    registeredValidators[target.constructor.name] = {
        ...registeredValidators[target.constructor.name],
        [propName]: [...registeredValidators[target.constructor.name][propName], 'positive']
    };
}

function Validate(object: any) {
    const objValidatorConfig = registeredValidators[object.constructor.name];
    if (!objValidatorConfig) {
        return true;
    }
    let isValid = true;
    for (const prop in objValidatorConfig) {
        for (const validator of objValidatorConfig[prop]) {
            switch (validator) {
                case 'required':
                    isValid = !!object[prop];
                    break;
                case 'positive':
                    isValid = object[prop] > 0;
                    break;
            }
        }
    }
    return isValid;
}

class Course {
    @Required
    title: string;
    @PositiveNumber
    price: number;

    constructor(t: string, p: number) {
        this.title = t;
        this.price = p;
    }
}

const courseForm = document.querySelector('form')!;
courseForm.addEventListener('submit', event => {
    event.preventDefault();
    const titleEl = document.getElementById('course-title')! as HTMLInputElement;
    const priceEl = document.getElementById('course-price')! as HTMLInputElement;

    const title = titleEl.value
    const price = +priceEl.value

    const createdCourse = new Course(title, price);
    if (!Validate(createdCourse)) {
        alert('Invalid input, please try again!');
        return;
    };
    console.log(createdCourse);

})