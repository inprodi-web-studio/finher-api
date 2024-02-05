module.exports = {
    routes : [
      {
        method  : "GET",
        path    : "/contacts/groups", 
        handler : "contact-group.find",
      },
      {
        method  : "GET",
        path    : "/contacts/groups/:uuid", 
        handler : "contact-group.findOne",
      },
      {
        method  : "POST",
        path    : "/contacts/groups", 
        handler : "contact-group.create",
      },
      {
        method  : "PUT",
        path    : "/contacts/groups/:uuid", 
        handler : "contact-group.update",
      },
      {
        method  : "DELETE",
        path    : "/contacts/groups/:uuid", 
        handler : "contact-group.delete",
      },
    ],
}