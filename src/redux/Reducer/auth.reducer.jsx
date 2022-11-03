const initialState = {
  token: null,
};

export const auth = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case "LOGIN_SUCCESS":
      return {
        ...state,

        token: payload.token,
      };

    default:
      return state;
  }
};
