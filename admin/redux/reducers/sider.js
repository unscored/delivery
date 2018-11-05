export const constants = {
  toggleSider: "TOGGLE_SIDER",
};

const model = {
  isCollapsed: true,
}

export default function (state = model, action) {
  if (action.type === constants.toggleSider ) {
    return { ...state, isCollapsed: !state.isCollapsed }
  }

  return { ...state };
}