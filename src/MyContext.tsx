import React from 'react';
import { createContext } from 'react';


export type StoreProviderProp = {
	children: React.ReactElement;
};

export type MyContextType = {
	s: string;
	saveS: (s: string) => void;
};

export const MyContext = createContext({} as MyContextType);//createContext<MyContextType | null>(null);
