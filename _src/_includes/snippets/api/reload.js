// browser reload
browserSync.reload();

// single file
browserSync.reload( "styles.css" );

// multiple files
browserSync.reload( ["styles.css", "ie.css"] );

// Since 2.6.0 - wildcards to reload ALL css files
browserSync.reload( "*.css" );
