module.exports = ( plugin ) => {
    plugin.routes["content-api"].routes.push({
        method  : "POST",
        path    : "/users",
        handler : "user.find",
        config  : {
            prefix : "",
        },
    });

    plugin.routes["content-api"].routes.push({
        method  : "PUT",
        path    : "/users/:uuid",
        handler : "user.update",
        config  : {
            prefix : "",
        },
    });

    plugin.routes["content-api"].routes.push({
        method  : "PATCH",
        path    : "/users/toggle/:uuid",
        handler : "user.toggle",
        config  : {
            prefix : "",
        },
    });
}