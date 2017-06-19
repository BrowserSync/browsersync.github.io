// browser reload
bs.reload();

// single file
bs.reload('styles.css');

// multiple files
bs.reload(['styles.css', 'ie.css']);

// Since 2.6.0 - wildcards to reload ALL css files
bs.reload('*.css');
