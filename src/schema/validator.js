/**
 * (c) Copyright Reserved EVRYTHNG Limited 2021. All rights reserved.
 * Use of this material is subject to license.
 * Copying and unauthorised use of this material strictly prohibited.
 */

const { default: Ajv } = require('ajv');
const { default: addFormats } = require('ajv-formats');
const EPCISDocument = require('./EPCISDocument.schema.json');

//const ajv = new Ajv({ useDefaults: true });
const ajv = addFormats(new Ajv({ useDefaults: true }), { mode: 'fast' });

/** Available schemas */
const validators = {
  EPCISDocument: ajv.compile(EPCISDocument),
};

/**
 * Validate an EPCIS document.
 *
 * @param {object} instance - The data to validate against the schema.
 * @returns {Array<string>} Any errors.
 */
const validateSchema = (instance) => {
  const test = validators.EPCISDocument;
  if (!test(instance)) {
    const [{ dataPath, message }] = test.errors;
    throw new Error(`${dataPath}: ${message}`);
  }
};

export default validateSchema;
