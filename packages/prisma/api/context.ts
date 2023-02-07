export interface Context {
  req: unknown;
}

export const createContext = async (req: unknown): Promise<Context> => {
  return {
    req,
  };
};
