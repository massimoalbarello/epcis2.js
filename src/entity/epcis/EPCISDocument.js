/**
 * (c) Copyright Reserved EVRYTHNG Limited 2021. All rights reserved.
 * Use of this material is subject to license.
 * Copying and unauthorised use of this material strictly prohibited.
 */

import Entity from '../Entity';
import EPCISHeader from './EPCISHeader';
import settings from '../../settings';
import objectToEvent from '../../utils/entityUtils';
import { validateEpcisDocument } from '../../schema/validator';

import Event from '../events/Event';

export default class EPCISDocument extends Entity {
  /**
   * You can either create an empty EPCISDocument or provide an already existing EPCIS document via
   * Map
   * @param {Object} [epcisDocument] - The object that will be used to create the EPCISDocument
   * entity
   */
  constructor(epcisDocument) {
    super(epcisDocument);
    this.type = 'EPCISDocument';

    if (!this.getContext()) {
      this.setContext(settings.EPCISDocumentContext);
    }

    if (!this.getSchemaVersion()) {
      this.setSchemaVersion(settings.EPCISDocumentSchemaVersion);
    }

    if (!this.getCreationDate()) {
      this.setCreationDate(new Date().toISOString());
    }

    if (!epcisDocument) {
      return;
    }

    // Create classes for sub-objects that are provided
    Object.entries(epcisDocument).forEach(([key, value]) => {
      switch (key) {
        case 'type':
          this.type = value;
          break;
        case 'epcisHeader':
          this.setEPCISHeader(new EPCISHeader(value));
          break;
        case 'epcisBody':
          if (value.eventList) {
            value.eventList.forEach((event) => this.addEvent(objectToEvent(event)));
          }
          break;
        // no default
      }
    });
  }

  /**
   * Set the type property
   * @param {string} type
   * @return {EPCISDocument} - the epcisDocument instance
   */
  setType(type) {
    return this.generateSetterFunction('type', type, ['string']);
  }

  /**
   * Getter for the type property
   * @return {string} - the type property
   */
  getType() {
    return this.type;
  }

  /**
   * Set the context property
   * @param {string|Object|Array<string>|Array<Object>} context
   * @return {EPCISDocument} - the epcisDocument instance
   */
  setContext(context) {
    this['@context'] = context;
    return this;
  }

  /**
   * Getter for the context property
   * @return {string|Object|Array<string>|Array<Object>} - the context
   */
  getContext() {
    return this['@context'];
  }

  /**
   * Set the schemaVersion property
   * @param {string} schemaVersion
   * @return {EPCISDocument} - the epcisDocument instance
   */
  setSchemaVersion(schemaVersion) {
    return this.generateSetterFunction('schemaVersion', schemaVersion, ['string']);
  }

  /**
   * Getter for the schemaVersion property
   * @return {string} - the schemaVersion
   */
  getSchemaVersion() {
    return this.schemaVersion;
  }

  /**
   * Set the creationDate property
   * @param {string} creationDate
   * @return {EPCISDocument} - the epcisDocument instance
   */
  setCreationDate(creationDate) {
    return this.generateSetterFunction('creationDate', creationDate, ['string']);
  }

  /**
   * Getter for the creationDate property
   * @return {string} - the creationDate
   */
  getCreationDate() {
    return this.creationDate;
  }

  /**
   * Set the epcisHeader property
   * @param {EPCISHeader} epcisHeader
   * @return {EPCISDocument} - the epcisDocument instance
   */
  setEPCISHeader(epcisHeader) {
    return this.generateSetterFunction('epcisHeader', epcisHeader, [EPCISHeader]);
  }

  /**
   * Getter for the epcisHeader property
   * @return {EPCISHeader} - the epcisHeader
   */
  getEPCISHeader() {
    return this.epcisHeader;
  }

  /**
   * Add the event to the "eventList" field
   * @param {Event} event - the event to add
   * @return {EPCISDocument} - the epcisDocument instance
   */
  addEvent(event) {
    return this.generateAddItemToListFunction('eventList', event, [Event]);
  }

  /**
   * Add each event to the "eventList" field
   * @param {Array<Event>} eventList - the events to add
   * @return {EPCISDocument} - the epcisDocument instance
   */
  addEventList(eventList) {
    return this.generateAddItemsToListFunction('eventList', eventList, [Event]);
  }

  /**
   * Clear the vocabularyList list
   * @return {EPCISDocument} - the epcisDocument instance
   */
  clearEventList() {
    delete this.eventList;
    return this;
  }

  /**
   * Remove the event from the "eventList" field
   * @param {Event} event - the events to remove
   * @return {EPCISDocument} - the epcisDocument instance
   */
  removeEvent(event) {
    this.eventList = this.eventList.filter((elem) => elem !== event);
    return this;
  }

  /**
   * Remove each event from the "eventList" field
   * @param {Array<Event>} eventList - the events to remove
   * @return {EPCISDocument} - the epcisDocument instance
   */
  removeEventList(eventList) {
    eventList.forEach((event) => this.removeEvent(event));
    return this;
  }

  /**
   * Getter for the eventList property
   * @return {Array<Event>} - the eventList
   */
  getEventList() {
    return this.eventList;
  }

  /**
   * Check if the EPCISDocument respects the rules of the standard defined in
   * src/schema/EPCISDocument.schema.json
   * @return {boolean} - true if the EPCIS document is valid
   * @throws {Error} - if the schema isn't valid
   */
  isValid() {
    const result = validateEpcisDocument(this.toObject());
    return result.success;
  }

  /**
   * @return {Object} an object corresponding to the Entity object
   */
  toObject() {
    const output = super.toObject();

    // the event or event list has to be in the epcisBody field
    if (output.eventList) {
      const body = {};
      body.eventList = output.eventList;
      delete output.eventList;
      output.epcisBody = body;
    }

    return output;
  }
}
