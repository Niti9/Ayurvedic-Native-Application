export const formatSlotTime = (start: string, end: string) => {
  const startTime = new Date(start).toLocaleTimeString('en-IN', {
    hour: 'numeric',
    minute: '2-digit',
  });

  const endTime = new Date(end).toLocaleTimeString('en-IN', {
    hour: 'numeric',
    minute: '2-digit',
  });

  return `${startTime} - ${endTime}`;
};
