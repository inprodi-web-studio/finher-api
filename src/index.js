"use strict";

const { uuid } = require("uuidv4");

const {
  USER,
  LEAD,
  INVITATION,
  LEAD_STAGE,
  CONTACT_TAG,
  CONTACT_GROUP,
  CONTACT_SOURCE,
} = require("./constants/models");

module.exports = {
  register(/*{ strapi }*/) {},

  bootstrap({ strapi }) {
    strapi.db.lifecycles.subscribe({
      models : [
        USER,
        LEAD,
        INVITATION,
        LEAD_STAGE,
        CONTACT_TAG,
        CONTACT_GROUP,
        CONTACT_SOURCE,
      ],
      async beforeCreate( event ) {
        const { data } = event.params;

        data.uuid = uuid();
      },
    });
  },
};
