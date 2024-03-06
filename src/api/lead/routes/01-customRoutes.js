module.exports = {
    routes : [
      {
        method  : "GET",
        path    : "/leads/:uuid", 
        handler : "lead.findOne",
      },
      {
        method  : "PUT",
        path    : "/leads/:uuid", 
        handler : "lead.update",
      },
      {
        method  : "PATCH",
        path    : "/leads/:uuid", 
        handler : "lead.keyUpdate",
      },
      {
        method  : "PATCH",
        path    : "/leads/:uuid/files", 
        handler : "lead.uploadFile",
      },
      {
        method  : "DELETE",
        path    : "/leads/:uuid/files/:key", 
        handler : "lead.removeFile",
      },
      {
        method  : "PATCH",
        path    : "/leads/:uuid/toggle-status", 
        handler : "lead.toggleStatus",
      },
      {
        method  : "DELETE",
        path    : "/leads/:uuid", 
        handler : "lead.delete",
      },
    ],
}