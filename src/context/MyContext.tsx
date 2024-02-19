
import { createContext } from 'react';


export type MyContextType = {
	s: string;
	saveS: (s: string) => void;
};

export const MyContext = createContext({} as MyContextType);
