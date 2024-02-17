module.exports = {
    routes : [
      {
        method  : "GET",
        path    : "/contacts/sources", 
        handler : "contact-source.find",
      },
      {
        method  : "GET",
        path    : "/contacts/sources/:uuid", 
        handler : "contact-source.findOne",
      },
      {
        method  : "POST",
        path    : "/contacts/sources", 
        handler : "contact-source.create",
      },
      {
        method  : "PUT",
        path    : "/contacts/sources/:uuid", 
        handler : "contact-source.update",
      },
      {
        method  : "DELETE",
        path    : "/contacts/sources/:uuid", 
        handler : "contact-source.delete",
      },
    ],
}