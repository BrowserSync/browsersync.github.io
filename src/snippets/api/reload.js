// browser reload
browserSync.reload();

// single file
browserSync.reload( "styles.css" );

// multiple files
browserSync.reload( ["styles.css", "ie.css"] );

// streams support
browserSync.reload( { stream: true } );