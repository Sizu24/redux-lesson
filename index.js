// App Code
// This is a pure function that takes the state, and action, and returns a new array with the updated state.
// Since we are not modifying any state directly, and returning a new array, this is a pure function.
function todos(state = [], action) { // state = [] because in the beginning the state might be undefined, so we want it to be an array.
  if (action.type === "ADD_TODO") {
    return state.concat([action.todo]);
  } else if (action.type === "REMOVE_TODO") {
    return state.filter((todo) => todo.id !== action.id);
  } else if (action.type === "TOGGLE_TODO") {
    // use map so that state doesn't directly modify, to keep this a pure function
    return state.map((todo) => 
    // Creates a new object, takes the stuff from todo, except for complete, and assigns it to the opposite of todo.complete
     todo.id !== action.id ? todo : Object.assign({}, todo, { complete: !todo.complete }));
  } else {
    return state;
  }
}

function goals(state =[], action) {
  if (action.type === "ADD_GOAL") {
    return state.concat([action.goal]);
  } else if (action.type === "REMOVE_GOAL") {
    return state.filter((goal) => {
      goal.id !== action.id;
    });
  } else if (action.type === "TOGGLE_GOAL") {
    state.map((goal) => goal.id !== action.id ? goal : Object.assign({}, goal, { complete: !goal.complete }));
  } else {
    return state;
  }
}

function app(state = {}, action) {
  return {
    todos: todos(state.todos, action),
    goals: goals(state.goals, action),
  }
}
// Library Code
function createStore(reducer) {
  // Manage state
  // Get state (provide API or a way to get the state)
  // Listen to changes on state
  // Update the state

  let state;
  let listeners = [];

  const getState = () => state;

  const subscribe = (listener) => {
    listeners.push(listener);
    return () => {
      listeners = listener.filter((l) => l !== listener);
    }
  };

  // This updates the state
  const dispatch = (action) => {
    state = reducer(state, action);
    listeners.forEach((listener) => {
      listener();
    });
  };

  // When createStore is invoked, we return an object for the getState function
  return {
    getState,
    subscribe,
    dispatch,
  };
}

const store = createStore(todos);

store.subscribe(() => {
  console.log('The new state is:', store.getState());
});


// This will update the state now everytime this function is ran
store.dispatch({
  type: 'ADD_TODO',
  todo: {
    id: 0,
    name: 'Learn Redux',
    complete: false
  }
});

// Use this if you want to unsubscribe a listener
const unsubscribe = store.subscribe(() => {
  console.log('The state has changed.');
});