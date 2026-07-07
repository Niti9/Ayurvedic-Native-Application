export const isFutureDate = (date: string): boolean => {
  return new Date(date).getTime() > Date.now();
};

export const isExpiredDate = (date: string): boolean => {
  return new Date(date).getTime() < Date.now();
};

export const formatDate = (date: string): string => {
  return new Intl.DateTimeFormat('en-IN', {
    dateStyle: 'medium',
  }).format(new Date(date));
};

export const formatTime = (date: string): string => {
  return new Intl.DateTimeFormat('en-IN', {
    timeStyle: 'short',
  }).format(new Date(date));
};

export const formatDateTime = (date: string): string => {
  return new Intl.DateTimeFormat('en-IN', {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(new Date(date));
};
