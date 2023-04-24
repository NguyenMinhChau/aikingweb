import { useContext } from 'react';
import { Context } from '../../appState';

export default function useAppContext() {
	const { state, dispatch } = useContext(Context);
	return { state, dispatch };
}
