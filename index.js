const ADD_TODO = 'ADD_TODO';
const REMOVE_TODO = 'REMOVE_TODO';
const TOGGLE_TODO = 'TOGGLE_TODO';
const ADD_GOAL = "ADD_GOAL";
const REMOVE_GOAL = "REMOVE_GOAL";
const TOGGLE_GOAL = "TOGGLE_GOAL";

// Helper function to generate ID
function generateId() {
  return Math.random().toString(36).substring(2) + (new Date()).getTime().toString(36);
}

// DOM code function for button in HTML file
function addToDo() {
  const input = document.querySelector('#todo');
  const name = input.value;
  input.value = '';

  store.dispatch(addToDoAction({
    name,
    id: generateId(),
    complete: false
  }));
}

// Function for button in HTML file
function addGoal() {
  const input = document.querySelector('#goal');
  const name = input.value;
  input.value = '';

  store.dispatch(addGoalAction({
    name,
    id: generateId(),
    complete: false
  }));
}

function createRemoveButton(onClick) {
  const removeButton = document.createElement('button');
  removeButton.innerHTML = 'X';
  removeButton.addEventListener('click', onClick);
  return removeButton;
}

function addTodoToDOM(todo) {
  const node = document.createElement('li');
  const text = document.createTextNode(todo.name);
  const removeButton = createRemoveButton(() => {
    store.dispatch(removeToDoAction(todo.id));
  });
  node.appendChild(text);
  node.appendChild(removeButton);
  node.style.textDecoration = todo.complete === true ? 'line-through': 'none';
  node.addEventListener('click', () => {
    store.dispatch(toggleToDoAction(todo.id));
  })
  document.querySelector("#todos").appendChild(node);
}

function addGoalToDOM(goal) {
  const node = document.createElement('li');
  const text = document.createTextNode(goal.name);
  const removeButton = createRemoveButton(() => {
    store.dispatch(removeGoalAction(goal.id));
  });
  node.appendChild(text);
  node.appendChild(removeButton);
  node.style.textDecoration = goal.complete === true ? 'line-through': 'none';

  node.addEventListener('click', () => {
    store.dispatch(toggleGoalAction(goal.id));
  });

  document.querySelector('#goals').appendChild(node);
}



// Action Creators
function addToDoAction(todo) {
  return {
    type: ADD_TODO,
    todo,
  }
}

// Action Creators
function removeToDoAction(id) {
  return {
    type: REMOVE_TODO,
    id,
  }
}

// Action Creators
function toggleToDoAction(id) {
  return {
    type: TOGGLE_TODO,
    id,
  }
}
// Action Creators
function addGoalAction(goal) {
  return {
    type: ADD_GOAL,
    goal,
  }
}

// Action Creators
function removeGoalAction(id) {
  return {
    type: REMOVE_GOAL,
    id,
  }
}

// Action Creators
function toggleGoalAction(id) {
  return {
    type: TOGGLE_GOAL,
    id,
  }
}

// App Code
// This is a pure function that takes the state, and action, and returns a new array with the updated state.
// Since we are not modifying any state directly, and returning a new array, this is a pure function.
function todos(state = [], action) { // state = [] because in the beginning the state might be undefined, so we want it to be an array.
  if (action.type === ADD_TODO) {
    return state.concat([action.todo]);
  } else if (action.type === REMOVE_TODO) {
    return state.filter((todo) => todo.id !== action.id);
  } else if (action.type === TOGGLE_TODO) {
    // use map so that state doesn't directly modify, to keep this a pure function
    return state.map((todo) => 
    // Creates a new object, takes the stuff from todo, except for complete, and assigns it to the opposite of todo.complete
     todo.id !== action.id ? todo : Object.assign({}, todo, { complete: !todo.complete }));
  } else {
    return state;
  }
}

function goals(state =[], action) {
  if (action.type === ADD_GOAL) {
    return state.concat([action.goal]);
  } else if (action.type === REMOVE_GOAL) {
    return state.filter((goal) => {
      goal.id !== action.id;
    });
  } else if (action.type === TOGGLE_GOAL) {
    return state.map((goal) => goal.id !== action.id ? goal : Object.assign({}, goal, { complete: !goal.complete }));
  } else {
    return state;
  }
}

/* This invokes both of the other reducers, which return their specific portions of state, and returns an object with the state of goals and state of todos
  Now only one reducer that is used for taking in the other 2 other reducers, since createStore only takes in one reducer.
*/
// function app(state = {}, action) {
//   return {
//     todos: todos(state.todos, action),
//     goals: goals(state.goals, action),
//   }
// }



// Library Code
// function createStore(reducer) {
//   // Manage state
//   // Get state (provide API or a way to get the state)
//   // Listen to changes on state
//   // Update the state

//   let state;
//   let listeners = [];

//   const getState = () => state;

//   const subscribe = (listener) => {
//     listeners.push(listener);
//     return () => {
//       listeners = listener.filter((l) => l !== listener);
//     }
//   };

//   // This updates the state
//   const dispatch = (action) => {
//     state = reducer(state, action);
//     listeners.forEach((listener) => {
//       listener();
//     });
//   };

//   // When createStore is invoked, we return an object for the getState function
//   return {
//     getState,
//     subscribe,
//     dispatch,
//   };
// }


// const store = createStore(app);
const store = Redux.createStore(Redux.combineReducers({
  todos, // This knows that you want a todos property in the state
  goals,
}));

store.subscribe(() => {
  // This gets the current state for each 
  const {goals, todos} = store.getState();

  document.querySelector('#goals').innerHTML = '';
  document.querySelector('#todos').innerHTML = '';

  goals.forEach(addGoalToDOM);
  todos.forEach(addTodoToDOM);
});


// // These will update the state now everytime the functions are ran
// store.dispatch(addToDoAction({
//     todo: {
//       id: 0,
//       name: 'Learn Redux',
//       complete: false
//     }
//   }
// ));

// store.dispatch(addToDoAction({
//     todo: {
//       id: 1,
//       name: 'Learn React',
//       complete: true
//     }
//   }
// ));

// store.dispatch(removeToDoAction(1));
// store.dispatch(toggleToDoAction(0));

// store.dispatch(addGoadAction({
//     goal: {
//       id: 0,
//       name: 'React Expert',
//       complete: false
//     }
//   }
// ));

// store.dispatch(toggleGoalAction(0));

// // Use this if you want to unsubscribe a listener
// const unsubscribe = store.subscribe(() => {
//   console.log('The state has changed.');
// });

document.querySelector('#todo-button').addEventListener('click', addToDo);
document.querySelector('#goal-button').addEventListener('click', addGoal);