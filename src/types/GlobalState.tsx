interface GlobalState {}

export type { GlobalState };

export const defaultGlobalState: () => GlobalState = () => {
  return {};
};
