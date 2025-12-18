# Practice TypeScript
This repository has been created for educational purposes to demonstrate core TypeScript concepts.

## String literal types
String literal types restrict strings to exact values — useful for enums or allowed options.

```ts
type Status = "active" | "inactive" | "pending";

const setStatus = (s: Status) => { /* s is one of the three strings */ }
setStatus("active");
// setStatus("other"); // compile error

const roles = ["admin", "user"] as const;
type Role = typeof roles[number]; // "admin" | "user"
```

## Type narrowing
Type narrowing refines a union type to a more specific type using runtime checks.

Common techniques:
- typeof (primitives)
- instanceof (classes)
- in (property presence)
- discriminated unions (shared tag like kind/type)
- custom type guards (function x is T)

Examples:
```ts
const format = (x: string | number) => {
  if (typeof x === "string") return x.trim();      // x is string
  return x.toFixed(2);                             // x is number
}

type Circle = { kind: "circle"; radius: number };
type Square = { kind: "square"; side: number };
const area = (s: Circle | Square) => {
  if (s.kind === "circle") return Math.PI * s.radius ** 2; // narrowed to Circle
  return s.side * s.side;                                   // Square
}

const isString = (v: unknown): v is string => {
  return typeof v === "string";
}
```

## Quick notes
- Prefer string literal types over plain strings for finite options.
- Use discriminated unions for clear runtime checks.
- Keep type guards small and reusable.

## Optional params (? - < Partial >)
If you want to define an optional param you just can put a `?` just after the param name: 
```TS
type Options = {
  origin?: string;
  methods?: Method;
  headers: Headers;
};
```
- It only works if you want to mix optional params with mandatory one's 

If all the params are optional use: 
```TS
type PaginationOptions = {
  page: number
  limit: number
  offset: number
}

export const getTokens = (userId: number, {
  page = 1,
  limit = 10,
  offset = 0
}: Partial<PaginationOptions>) => {}
```

## Union Types
Union types allow you to define a variable or parameter that can be one of several types. This is useful when working with arrays that may contain different types of elements.

```TS
type Status = "active" | "inactive" | "pending";

type User = {
  id: number;
  name: string;
  status: Status;
};

type AdminOrUser = {
  role: "admin" | "user";
  permissions: string[];
};
```

You can also use discriminated unions with arrays:
```TS
type Circle = { kind: "circle"; radius: number };
type Square = { kind: "square"; sideLength: number };
type Shape = Circle | Square;

const shapes: Shape[] = [
  { kind: "circle", radius: 5 },
  { kind: "square", sideLength: 10 }
];
```

## Generics (< T >)
Generics allow us to create reusable code components that can work with a variety of types rather than a single one. This is particularly useful for utility types or functions, such as handling pagination responses for different entities (e.g., Categories, Fruits, Users).

### 1. Defining a Generic Type
Here, we define a Pagination type that accepts a generic parameter <T>. This T acts as a placeholder for the specific type of data that will be in the array.

`Pagination` is the type of a funcition that recieve diferent types of Arrays (categories, fruits, ...) 
```TS
type Pagination<T> = {
  items: T[];      // An array of items of type T
  pages: number;   // Total number of pages
  total: number;   // Total count of items
};
```
### 2. Defining a Concrete Type
Next, we define a specific structure. In this example, we create a Category type.
```TS
type Category = {
  readonly id: number;
  name: string;
};

// Example data
const categories: Category[] = [
  {
    id: 1,
    name: "Technology"
  }
];
```
### 3. Implementing the Generic Type
Finally, we use the Pagination type specifically for categories by passing Category as the type argument (Pagination<Category>). This ensures that the items array strictly contains Category objects.
```TS
const resultado: Pagination<Category> = {
    items: categories,
    pages: 1,
    total: 1
}
```