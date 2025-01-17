/**
 * (c) Copyright Reserved EVRYTHNG Limited 2021. All rights reserved.
 * Use of this material is subject to license.
 * Copying and unauthorised use of this material strictly prohibited.
 */

/* eslint-disable class-methods-use-this */
/* eslint-disable no-unused-vars */

import Event, { fieldToFunctions } from './Event';

const invalidFields = ['ilmd', 'epcList', 'quantityList'];

export default class AssociationEvent extends Event {
  /**
   * You can either create an empty Association Event or provide an already existing Association
   * event via Object
   * @param {Object} [associationEvent] - The object that will be used to create the
   * AssociationEvent entity
   */
  constructor(associationEvent) {
    super(associationEvent);
    this.type = 'AssociationEvent';
    invalidFields.forEach((name) => {
      const functions = fieldToFunctions[name];
      functions.forEach((func) => {
        this[func] = () => {
          throw new Error(`${name} is not a field of the AssociationEvent class`);
        };
      });
    });
  }
}
