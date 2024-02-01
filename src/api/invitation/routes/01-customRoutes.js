module.exports = {
    routes : [
      {
        method  : "PUT",
        path    : "/invitations/:uuid", 
        handler : "invitation.keyUpdate",
      },
    ],
}