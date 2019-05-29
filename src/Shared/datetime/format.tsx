export const timeFromDate = (date: string) => (
	date.substring(11, 16)
);

export const dateFromDate = (date: string) => (
	`${date.substring(8, 10)}/${date.substring(5, 7)}/${date.substring(0, 4)}`
);