module.exports = {
    routes : [
      {
        method  : "PATCH",
        path    : "/leads/:uuid", 
        handler : "lead.keyUpdate",
      },
    ],
}