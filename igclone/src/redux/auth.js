const init = {
  email: "",
};

function userReducer(state = init, action) {
  //action adalah event yang terjadi
  if (action.type == "login") {
    return {
      ...state,
      id: action.payload.id,
      email: action.payload.email,
      name: action.payload.name,
      username: action.payload.username,
      avatar_url: action.payload.avatar_url,
    };
  } else if (action.type == "logout") {
    return init;
  }

  return state;
}

export default userReducer;
