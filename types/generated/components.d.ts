import type { Schema, Attribute } from '@strapi/strapi';

export interface ContactAddress extends Schema.Component {
  collectionName: 'components_contact_addresses';
  info: {
    displayName: 'Address';
  };
  attributes: {
    street: Attribute.String;
    ext: Attribute.String;
    int: Attribute.String;
    suburb: Attribute.String;
    cp: Attribute.String;
    city: Attribute.String;
    state: Attribute.String;
    country: Attribute.String;
  };
}

export interface ContactCompleteName extends Schema.Component {
  collectionName: 'components_contact_complete_names';
  info: {
    displayName: 'Complete Name';
  };
  attributes: {
    name: Attribute.String;
    middleName: Attribute.String;
    lastName: Attribute.String;
  };
}

export interface ContactFiles extends Schema.Component {
  collectionName: 'components_contact_files';
  info: {
    displayName: 'Files';
  };
  attributes: {
    invoiceFront: Attribute.Media;
    invoiceBack: Attribute.Media;
    idFront: Attribute.Media;
    idBack: Attribute.Media;
    addressProof: Attribute.Media;
  };
}

export interface ContactPhone extends Schema.Component {
  collectionName: 'components_contact_phones';
  info: {
    displayName: 'Phone';
  };
  attributes: {
    code: Attribute.String;
    number: Attribute.String;
  };
}

declare module '@strapi/types' {
  export module Shared {
    export interface Components {
      'contact.address': ContactAddress;
      'contact.complete-name': ContactCompleteName;
      'contact.files': ContactFiles;
      'contact.phone': ContactPhone;
    }
  }
}
