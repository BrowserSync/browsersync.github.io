module.exports.tasks = [
    function (obs, opts, ctx) {
    	return ctx.vfs.src(opts.input).pipe(ctx.vfs.dest(opts.output));
    }
];