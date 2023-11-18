/** @format */

const globalErrHandler = (err, req, res, next) => {
	//status: failed or something else
	//message: the actual error
	//stack: shows where the issue is

	const stack = err.stack;
	const message = err.message;
	const status = err.status ? err.status : 'failed';
	const statusCode = err.statusCode ? err.statusCode : 500;
	//send response
	res.status(statusCode).json({
		message,
		status,
		stack,
	});
};

module.exports = globalErrHandler;
