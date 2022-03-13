const {
	addBookHandler,
	getBookHandler,
	getBookDetailHandler,
	updateBookHandler,
	deleteBookHandler,
} = require("./handler");

const routes = [
	{
		method: "POST",
		path: "/books",
		// handler: () => { },
		handler: addBookHandler,
	},
	{
		method: "GET",
		path: "/books",
		// handler: () => { },
		handler: getBookHandler,
	},
	{
		method: "GET",
		path: "/books/{id}",
		handler: getBookDetailHandler,
	},
	{
		method: "PUT",
		path: "/books/{id}",
		handler: updateBookHandler,
	},
	{
		method: "DELETE",
		path: "/books/{id}",
		handler: deleteBookHandler,
	},
];

module.exports = routes;
