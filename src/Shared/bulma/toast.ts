import * as bulmaToast from 'bulma-toast';

export type ToastTypes = 'is-success' | 'is-danger' | 'is-primary';

export const displayToast = (message: string, type: ToastTypes) => {
  bulmaToast.toast({
    message: message,
    type: type,
    closeOnClick: true,
    duration: 1000,
    position: 'bottom-right',
    animate: { in: "fadeIn", out: "fadeOut" }
  });
};
