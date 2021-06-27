// Generices
// const genericType: Array<any> = [];
// const names: Array<string> = ['max', 'manish']; // string[]

// const promise: Promise<string> = new Promise((resolve) => {
//     setTimeout(() => {
//         resolve('This is done!')
//     }, 2000);
// })

// promise.then((data) => {
//     data.split(' ');
//     console.log(data);
// })

// Generices Functions

// T and U are of type any

function merge<T extends object, U extends object>(obj: T, objB: U) {
    return Object.assign(obj, objB);
}


// console.log(merge({ name: 'Manish' }, { age: 29 })); // {name: "Manish", age: 29}

const mergedObj = merge({ name: 'Manish', hobbies: ['sports'] }, { age: 29 });

console.log(mergedObj.age);


interface Lengthy {
    length: number;
}

function countAndPrint<T extends Lengthy>(element: T): [T, string] {
    let descriptionText = 'Got no value.'
    if (element.length === 1) {
        descriptionText = 'Got 1 element.'
    } else if (element.length > 1) {
        descriptionText = 'Got ' + element.length + ' elements.'
    }
    return [element, descriptionText]
}

console.log(countAndPrint('Hi there!'));
console.log(countAndPrint([]));
console.log(countAndPrint(['Manish', 'Verma']));
// ! Argument of type 'number' is not assignable to parameter of type 'Lengthy'
// console.log(countAndPrint(90));

// T any kind of object and U any kind of k in that object
function extractAndConvert<T extends object, U extends keyof T>(obj: T, key: U) {
    return `Value : ${obj[key]}`;
}

console.log(extractAndConvert({ name: 'manish' }, 'name'));

// Generic Classes

class DataStorage<T extends string | number | boolean> {
    // private data: Array<any> = [];
    private data: Array<T> = [];

    addItem(item: T) {
        this.data.push(item)
    }

    removeItem(item: T) {
        if (this.data.indexOf(item) === -1) {
            return
        }
        this.data.splice(this.data.indexOf(item), 1) // -1
    }

    getItem() {
        // return this.data
        return [...this.data]; // return a copy of data
    }

}

const textStorage = new DataStorage<string>();
textStorage.addItem('Manish');
textStorage.addItem('Manu');
// textStorage.addItem(3); // ! error
console.log(textStorage.getItem());

const numberStorage = new DataStorage<number>();
numberStorage.addItem(3);
// numberStorage.addItem('Manish'); // ! error

const combineStorage = new DataStorage<number | boolean | string>();

combineStorage.addItem(3);
combineStorage.addItem('Manish');


// it will not work for object types since object is reference
// const objStorage = new DataStorage<object>(); // ! error
// objStorage.addItem({ name: 'Manish' });
// objStorage.addItem({ name: 'Max' });
// // ... 
// objStorage.removeItem({ name: 'Manish' });
// console.log(objStorage.getItem()); // always remove last element

// build in types

interface CourseGoal {
    title: string,
    description: string,
    date: Date
}

function createCourseGoal(title: string, description: string, date: Date): CourseGoal {
    return ({ title, description, date })
}

function createCourseGoalPartial(title: string, description: string, date: Date): CourseGoal {
    // this is an object which wil  at the end produce an specific type
    let courseGoal: Partial<CourseGoal> = {}
    courseGoal.title = title
    courseGoal.description = description
    courseGoal.date = date
    return courseGoal as CourseGoal;
}

const names: Readonly<string[]> = ['Manish', 'Pooja'];
// names.push('Rashmi'); // ! error
// names.pop(); // ! error

