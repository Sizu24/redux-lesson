// App Code
// This is a pure function that takes the state, and action, and returns a new array with the updated state.
// Since we are not modifying any state directly, and returning a new array, this is a pure function.
function todos(state = [], action) { // state = [] because in the beginning the state might be undefined, so we want it to be an array.
  if (action.type === "ADD_TODO") {
    return state.concat([action.todo]);
  }

  // Returns state if action.type doesn't === "ADD_TODO"
  return state;
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

const unsubscribe = store.subscribe(() => {
  console.log('The state has changed.');
});