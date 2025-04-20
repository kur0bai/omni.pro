# Omnipro frontend Assesment

This project consists of front-end technical testing base in a solution to create tasks and projects by users, using the React framework NextJS with TypeScript and Firebase to manage database operations with Firestore and authentication. At the time, I didn't want to implement many user functions, so I decided to use only email and password authentication.

## Features

- Firestore API connection
- Auth service with firebase auth
- Dark and Light theme
- Persisting data for sessions
- Filters by projects and tasks
- Free registration for new users
- Responsive to test it in mobile devices
- Zustand state management
- Clean and minimalistic UI
- Testing enviroment setted
- TailwindCSS latest integration
- ORDER BY due date, expiration

---

## Description

From my perspective, I wanted to implement an application with NextJS because it allows me to render server-side faster and has everything necessary to run medium and large projects. Below I will explain the main folders that make up the project

### Project structure

```bash
-app #main folder
 --api #api functions to handle the auth cookies and sessions creation
 --auth #pages for the auth flow (login and register)
 --dashboard #page to handle the creation of projects and tasks
--components #reusable items to share logic between modules
	--core #like base
	--projects #projects components
	--tasks #tasks components like filters and cards
--constants #words and values to use many times as need it
--interfaces #typing our projects with best practices and enums too
--lib #libraries helpers
	--firebase #the magic library to handle our operations with storage and auth
--mocks #mocking firebase for testing cases
--services #logic to handle crud operations for tasks and projects
--store #state management
--utils #some util functions
--view-models #logic of our components to split the responsabilities
```

### 2. Why view models?

I find using view models to be an elegant and clean way to separate our logic from components in React, especially when they tend to scale considerably.
This way, I can better manage their readability and dynamism. I would have liked to implement more elements for clean, well-structured code, but I feel the project's needs don't require much for its effectiveness.
I also chose state management with zustand to improve the accuracy of the elements listed and retrieved from the database after CRUD operations, thereby enhancing the use of view models. And following standards and recomendations, like DRY principles and SOLID.
Also in order to avoid re-renders and using too many instances of them.

### 3. TailwindCSS

It's easy to say that it's a good framework for creating UI elements without following the same repetitive styles as Bootstrap, so I tried to create minimalist but nice UI elements by playing with some classes.

### Notes:

The project is already deployed in Vercel and in production. However, you can register as a new user and create your own projects.

However, I will provide test users in case you encounter problems with registration.

Using push notifications to notice about the expiring tasks is a good idea but I thought could be out of my control using firebase for the payment but If I have the time I'll check it and add it to the project :D

![enter image description here](https://i.imgur.com/8dW8R7Y.png)

### Unit Testing

I'll using some test in projects service logic, you can check it out and improve it.
We are using the classic jest to tests so I added the basic scripts to run them.

```
npm run test
npm run test:watch #if you wanna check in real time
```

### Thanks!

This should work!
Please, feel free to leave a comment or feedback if need it.
