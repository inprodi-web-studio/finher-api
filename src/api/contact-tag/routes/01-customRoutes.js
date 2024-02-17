module.exports = {
    routes : [
      {
        method  : "GET",
        path    : "/contacts/tags", 
        handler : "contact-tag.find",
      },
      {
        method  : "GET",
        path    : "/contacts/tags/:uuid", 
        handler : "contact-tag.findOne",
      },
      {
        method  : "POST",
        path    : "/contacts/tags", 
        handler : "contact-tag.create",
      },
      {
        method  : "PUT",
        path    : "/contacts/tags/:uuid", 
        handler : "contact-tag.update",
      },
      {
        method  : "DELETE",
        path    : "/contacts/tags/:uuid", 
        handler : "contact-tag.delete",
      },
    ],
}