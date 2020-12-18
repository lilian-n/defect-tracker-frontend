const defectFilterReducer = (state = "NONE", action) => {
  switch (action.type) {
    case "SET_FILTER":
      return action.project;
    default:
      return state;
  }
}

export const changeFilter = (projectId) => {
  return {
    type: "SET_FILTER",
    project: projectId
  }
}

export default defectFilterReducer;