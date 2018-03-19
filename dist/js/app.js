requirejs.config({
    baseUrl: '/zhigouhao/dist/js',
    paths: {
    	"jquery": "lib/jquery.min",
    	"lazyload": "lib/jquery.lazyload.min",
    	"tpl": "lib/tmodjs",    	
    	"rem": "app/setFontsize",
    	"tools": "app/tools"
    },
    shim: {
        "lazyload": {
            deps: ["jquery"],
            exports: "lazyload"
        },
        "tools": {
            deps: ["jquery"],
            exports: "tools"
        }
    }
});

// Start the main app logic.
