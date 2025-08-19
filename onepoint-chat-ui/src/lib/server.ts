const server = import.meta.env.VITE_SERVER;

export const getServer = () => {
  return server || 'http://localhost:9999/protected';
};
