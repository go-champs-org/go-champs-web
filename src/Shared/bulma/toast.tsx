import * as bulmaToast from 'bulma-toast';

export type ToastTypes = 'is-success' | 'is-danger' | 'is-primary';

export const displayToast = (message: string, type: ToastTypes) => {
	bulmaToast.toast({
		message: message,
		type: type,
		pauseOnHover: true,
		position: 'top-center',
		animate: { in: 'fadeIn', out: 'fadeOut' }
	});
};