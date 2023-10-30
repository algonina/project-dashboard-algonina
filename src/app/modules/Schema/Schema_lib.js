
    const defaultState = {
        status:"default",
        data: [],
        code: 500,
        message: "",
      };
      
      let response = {};
      const Schema_lib = (state = defaultState, action = {}) => {
        switch (action.type) {
          case "SUCCESS_SCHEMA_SCHEMA":
            response = {
              ...state,
              data: action.data ? action.data : {},
              code: action.code ? action.code : 500,
              status:"success",

              message: action.message ? action.message : "",
            };
      
            break;
            case "LOADING_SCHEMA_SCHEMA":
            response = {
              ...state,
              status:"loading",

            };
            break;
          case "ERROR_SCHEMA_SCHEMA":
            response = {
              ...state,
              status:"error",
              message: action.message ? action.message : "",
              code: action.code ? action.code : 500,
            };
            break;
          default:
            return {
              ...state, 
            };
        }
      
        return response;
      };
      
      export default Schema_lib
      