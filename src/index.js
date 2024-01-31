"use strict";

const { uuid } = require("uuidv4");

const { USER, INVITATION } = require("./constants/models");

module.exports = {
  register(/*{ strapi }*/) {},

  bootstrap({ strapi }) {
    strapi.db.lifecycles.subscribe({
      models : [
        USER,
        INVITATION,
      ],
      async beforeCreate( event ) {
        const { data } = event.params;

        data.uuid = uuid();
      },
    });
  },
};
