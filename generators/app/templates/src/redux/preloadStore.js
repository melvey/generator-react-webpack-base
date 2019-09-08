import '@babel/polyfill';

const routes = [
	{
		match: /admin\/?$/, // Regex to match url
		loader: (store, matches, user) => new Promise((resolve) => resolve()) // loader function should load data, update store and return a promise
	}
];

/**
 * Preload the redux store on the server
 * @param {Redux.Store} store The redux store to update
 * @param {string} url The current page URL
 * @param {object} user The user object from Request.user (optional)
 **/
function preloadStore(store, url, user) {

	const allRoutes = routes.map((route) => {
		const matches = url.match(routes.match);
		if(matches) {
			return route.loader(store, matches, user)
				.then(() => store);
		}
		return false;
	})
		.filter((routePromise) => !!routePromise); // filter out unmatched routes

	return Promise.all(allRoutes)
		.then(() => store);
}

export default preloadStore;
