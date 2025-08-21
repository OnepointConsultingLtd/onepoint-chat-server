const server = import.meta.env.VITE_SERVER;

export const getServer = () => {
  return server || 'https://ai-engine.onepointltd.ai/protected';
};
