import 'babel-polyfill';
import reducer from './reducers/RootReducer';

function preloadStore(store, url) {
	let loaderPromise = new Promise((resolve) => resolve());

	if(url.match(/admin\/?$/)) {
		/* Load data and return promise resolving when store is udpated */
	}

	return loaderPromise.then(() => store);

}

export default preloadStore;
