"use strict";

const { uuid } = require("uuidv4");

const { USER, INVITATION, CONTACT_GROUP } = require("./constants/models");

module.exports = {
  register(/*{ strapi }*/) {},

  bootstrap({ strapi }) {
    strapi.db.lifecycles.subscribe({
      models : [
        USER,
        INVITATION,
        CONTACT_GROUP,
      ],
      async beforeCreate( event ) {
        const { data } = event.params;

        data.uuid = uuid();
      },
    });
  },
};
