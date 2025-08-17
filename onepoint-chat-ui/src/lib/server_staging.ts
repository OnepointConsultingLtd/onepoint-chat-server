const server = import.meta.env.VITE_SERVER;

export const getServer = () => {
  return server || 'http://176.34.128.143:8083/protected';
};
