---
layout: styled-md
styling: github-styling.html
---

<div style="text-align:right; width:100%; font-size:18px;">George Lewis - 22 December 2019</div>

# Virtual in C++ - How does it work?

### The Problem

**Source code demonstrations: [Gist](https://gist.github.com/George-lewis/f5a64164b50f227ae3c023943eb54ed0)**

The `virtual` keyword in C++ is something that's difficult to define concisely. It may be confusing to new C++ developers, especially to those coming from Java because it's not incredibly clear what it actually does. It kind of looks like Java's `abstract` mechanism but it isn't actually the same and it isn't even necessary to use inheritance.

So, imagine that you want to make use of polymorphism and you have one class deriving from another. Consider the following classes:

```cpp
class Base {
    int get() { return 5; }
}

class Derived : public Base {
    int get() { return 7; }
}
```

Looks fine, right? `Derived` extends `Base` and overrides the method `get()` to return `7` instead of `5`. Let's test it:

```cpp
int main() {
    Base* bptr = new Base;
    Derived* dptr = new Derived;
    bptr->get(); // Returns 5
    dptr->get(); // Returns 7
}
```

Nice, works as expected. Now let's try and leverage polymorphism:

```cpp
int poly(Base* ptr) { // Polymorphic function
    return ptr->get();
}

int main() {
    Derived* dptr = new Derived;
    Base* bptr = dptr; // Polymorphism!
    bptr->get(); // 5 - wait, what?
    poly(dptr); // implicit cast to Base* | Also returns 5
}
```

This might go against what you expect. Why is it returning 5? `bptr` clearly points to an instance of `Derived`, right?

### The Solution

The solution is to use the virtual keyword. The virtual keyword instructs C++ to invoke the most derived version of a function that applies for that particular object. Consider the following change:

```cpp
class Base {
    virtual int get() { return 5; }
}
```

Changing `Base::get` to be a virtual method signals to C++ that it needs to use `Derived::get` even when we've upcast a `Derived` pointer to a `Base` pointer. This change means:

```cpp
Base* ptr = new Derived;
ptr->get(); // Now returns 7!
```

> ### Aside: Then what's a pure virtual function?
>
> A pure virtual function is indeed very similar to Java's `abstract` specifier, it requires that all extending classes provide an implementation of the method. You declare the virtual method as normal but instead of providing a body assign the function to `0`:
> ```cpp
> class Base {
> 	virtual int get() = 0; // Pure virtual function
> }
> ```
> This means that `Base` is now abstract and can't itself be instantiated. See [5] for more.

If all you wanted to know was how to use virtual you can stop here, but I think it's important to understand why things are this way and how it all works.

### Ok, but why?

It turns out that C++ does a lot behind the scenes when you declare a virtual method. The reason things don't act like this normally is because polymorphism incurs a cost at runtime and this goes against the C++ philosophy:

>   The C++ philosophy is: "fast by default"^[1]^
>
> \- Some guy on StackOverflow

#### Well then, how's it work?

When the compiler is processing your source it does what is known as **binding**, this is the process of converting identifiers like variables and function names into memory addresses. Usually, when the compiler comes across a function call it can know straight away the memory address of the function that needs to be called and will bind it right there in what's known as **early binding**. However, when polymorphism and virtual methods or function pointers are involved the compiler can't know the memory address of the function that needs to be called at compile time, and so it has happen at runtime in what's called **late binding**.^[3]^

Consider the method `poly` from earlier:

```cpp
int poly(Base* ptr) {
    return ptr->get(); // What function call is this?
}
```

How could the compiler know which `get()` needs to be called?

### Introducing: The Virtual Table

When a class has a method marked `virtual` C++ creates a **virtual table** for that class and all deriving classes which maps virtual methods to function pointers. When calling a virtual function C++ uses this table to lookup the right function to call. Because each deriving class has their own version of the table, the most derived form of the method is always called.^[4]^

Both `Base` and `Derived` have virtual tables with an entry for `get()`, however the virtual table for `Base` points to `Base::get` and of course the virtual table for `Derived` points to `Derived::get`.  When C++ needs to invoke `get()` it gets a function pointer from the object's virtual table and invokes that method. This is the overhead talked about earlier: rather than being able to directly bind the function call to a memory address it instead has to be looked up from a table at runtime.

### Bonus: "Polymorphism" in C the C++ way

To fully understand how it works in C++, I find that it helps a bit to sort of simulate what the C++ compiler is doing with C code. Simulating what the compiler does actually allows a sort of pseudo-polymorphism in C. Consider the following code with a "class" that performs some transformation on an integer: (Source adapted from a StackOverflow answer^[2]^)

```c
typedef struct vtable { // Virtual table for holding methods
    int (*process)(int); // Pointer to a function that returns an int and takes in an int
} vtable;

typedef struct NumberProcessor { // "class" that processes an integer
    const vtable* vtable; // Method table
} NumberProcessor;

int square(int a) { return a*a; }
int third(int a) { return a*a*a; }

const vtable vsquare = { square };
const vtable vthird = { third };

int proc(NumberProcessor* nproc, int n) { // "polymorphic" function
    return nproc->vtable->process(n); // Get function ptr from vtable
}

int main() {

	NumberProcessor square_ptr = { &vsquare }; // Squares a number
    NumberProcessor third_ptr = { &vthird }; // Computes n*n*n
    
	printf("%i\n", proc(&square_ptr, 5)); // Prints 25 (5*5)
    printf("%i\n", proc(&third_ptr, 3)); // Prints 27 (3*3*3)

}
```

> Note: Imports have been omitted

Notice that what we've done is essentially implement the virtual table ourselves! while `square_ptr` and `third_ptr` are both structs of the same type they act differently because their virtual tables point to different methods, yet we can still pass both through the same function because they are of the same type. This is essentially what the C++ compiler is doing behind the scenes.

### References and Further Reading

1. https://stackoverflow.com/questions/2391679/why-do-we-need-virtual-functions-in-c
2. https://stackoverflow.com/questions/8194250/polymorphism-in-c
3. https://www.learncpp.com/cpp-tutorial/124-early-binding-and-late-binding/
4. https://www.learncpp.com/cpp-tutorial/125-the-virtual-table/
5. https://www.learncpp.com/cpp-tutorial/126-pure-virtual-functions-abstract-base-classes-and-interface-classes/