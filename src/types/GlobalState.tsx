interface GlobalState {
  codeType: string;
  modalButtonType: string;
}

export type { GlobalState };

export const defaultGlobalState: () => GlobalState = () => {
  return {
    codeType: 'form',
    modalButtonType: 'button',
  };
};
