const { nanoid } = require("nanoid");
const books = require("./books");

const addBookHandler = (request, h) => {
	const {
		name,
		year,
		author,
		summary,
		publisher,
		pageCount,
		readPage,
		reading,
	} = request.payload;

	const id = nanoid(16);
	const insertedAt = new Date().toISOString();
	const updatedAt = insertedAt;
	const finished = pageCount === readPage;

	const newNote = {
		id,

		name,
		year,
		author,
		summary,
		publisher,
		pageCount,
		readPage,
		reading,

		finished,

		insertedAt,
		updatedAt,
	};

	if (pageCount < readPage) {
		const response = h.response({
			status: "fail",
			message:
				"Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount",
		});
		response.code(400);
		return response;
	}
	if (name == null) {
		const response = h.response({
			status: "fail",
			message: "Gagal menambahkan buku. Mohon isi nama buku",
		});
		response.code(400);
		return response;
	}

	books.push(newNote);

	const isSuccess = books.filter((book) => book.id === id).length > 0;

	if (isSuccess) {
		const response = h.response({
			status: "success",
			message: "Buku berhasil ditambahkan",
			data: {
				bookId: id,
			},
		});
		response.code(201);
		return response;
	} else {
		const response = h.response({
			status: "fail",
			message: "Buku gagal ditambahkan",
		});
		response.code(500);
		return response;
	}
};

const getBookHandler = (request, h) => {
	const result = books.map((book) => {
		const arrayBook = {};
		arrayBook.id = book.id;
		arrayBook.name = book.name;
		arrayBook.publisher = book.publisher;
		return arrayBook;
	});

	const response = h.response({
		status: "success",
		data: {
			books: result,
		},
	});
	response.code(200);
	return response;
};

const getBookDetailHandler = (request, h) => {
	const { id } = request.params;

	const book = books.filter((n) => n.id === id)[0];

	if (book !== undefined) {
		return {
			status: "success",
			data: {
				book: book,
			},
		};
	}

	const response = h.response({
		status: "fail",
		message: "Buku tidak ditemukan",
	});
	response.code(404);
	return response;
};

const updateBookHandler = (request, h) => {
	const { id } = request.params;

	const {
		name,
		year,
		author,
		summary,
		publisher,
		pageCount,
		readPage,
		reading,
	} = request.payload;

	const updatedAt = new Date().toISOString();

	const finished = pageCount === readPage;

	if (typeof name === "undefined") {
		const response = h.response({
			status: "fail",
			message: "Gagal memperbarui buku. Mohon isi nama buku",
		});
		response.code(400);
		return response;
	}

	if (readPage > pageCount) {
		const response = h.response({
			status: "fail",
			message:
				"Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount",
		});
		response.code(400);
		return response;
	}

	const index = books.findIndex((book) => book.id === id);

	if (index !== -1) {
		books[index] = {
			...books[index],
			name,
			year,
			author,
			summary,
			publisher,
			pageCount,
			readPage,
			finished,
			reading,
			updatedAt,
		};
		const response = h.response({
			status: "success",
			message: "Buku berhasil diperbarui",
		});
		response.code(200);
		return response;
	}

	const response = h.response({
		status: "fail",
		message: "Gagal memperbarui buku. Id tidak ditemukan",
	});
	response.code(404);
	return response;
};

const deleteBookHandler = (request, h) => {
	const { id } = request.params;

	const index = books.findIndex((book) => book.id === id);

	if (index !== -1) {
		books.splice(index, 1);
		const response = h.response({
			status: "success",
			message: "Buku berhasil dihapus",
		});
		response.code(200);
		return response;
	}

	const response = h.response({
		status: "fail",
		message: "Buku gagal dihapus. Id tidak ditemukan",
	});
	response.code(404);
	return response;
};

module.exports = {
	addBookHandler,
	getBookHandler,
	getBookDetailHandler,
	updateBookHandler,
	deleteBookHandler,
};
