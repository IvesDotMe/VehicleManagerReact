import React from 'react';
import { StoreProviderProp, MyContext } from './MyContext';



const MyProvider: React.FC<StoreProviderProp> = (props) => {
	const [s, setS] = React.useState('lol');

	const saveS = (sss: string) => {
		setS(sss)
	}

	return (
		<MyContext.Provider value={{ s, saveS }}>
			{props.children}
		</MyContext.Provider>
	);
}

export default MyProvider;