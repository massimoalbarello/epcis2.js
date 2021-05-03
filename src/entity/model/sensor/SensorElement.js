import SensorMetadata from './SensorMetadata'
import SensorReportElement from './SensorReportElement'

export default class SensorElement {
  /**
   * You can either create an empty SensorElement or provide an already existing SensorElement via
   * Map
   * @param {{}} [sensor] - The Map that will be used to create the SensorElement entity
   */
  constructor (sensor) {
    if (!arguments.length) {
      // create an empty SensorElement object
      return
    }

    for (const prop in sensor) {
      if (sensor.hasOwnProperty(prop)) {
        if (prop === 'sensorMetadata') {
          this.setSensorMetadata(new SensorMetadata(sensor[prop]))
        } else if (prop === 'sensorReport') {
          sensor[prop].forEach(sensorReport => this.addSensorReport(new SensorReportElement(sensorReport)))
        } else {
          this[prop] = sensor[prop]
        }
      }
    }
  }

  /**
   * Set the sensorMetadata property
   * @param {SensorMetadata} sensorMetadata
   * @return {SensorElement} - the sensor instance
   */
  setSensorMetadata (sensorMetadata) {
    this.sensorMetadata = sensorMetadata
    return this
  }

  /**
   * Add the sensorReport to the "sensorReportList" field
   * @param {SensorReportElement} sensorReport - the sensorReport to add
   * @return {SensorElement} - the objectEvent instance
   */
  addSensorReport (sensorReport) {
    if (!this.sensorReport) {
      this.sensorReport = []
    }
    this.sensorReport.push(sensorReport)
    return this
  }

  /**
   * Add each sensorReportElement to the "sensorReportList" field
   * @param {Array<SensorReportElement>} sensorReportList - the sensorReports to add
   * @return {SensorElement} - the objectEvent instance
   */
  addSensorReportList (sensorReportList) {
    if (!this.sensorReport) {
      this.sensorReport = []
    }
    sensorReportList.forEach(sensorReportElement => this.addSensorReport(sensorReportElement))
    return this
  }

  /**
   * Clear the sensorReport list
   * @return {SensorElement} - the objectEvent instance
   */
  clearSensorReportList () {
    delete this.sensorReport
    return this
  }

  /**
   * Remove a sensorReport from the "sensorReportList" field
   * @param {SensorReportElement} sensorReport - the sensorReport to remove
   * @return {SensorElement} - the objectEvent instance
   */
  removeSensorReport (sensorReport) {
    if (!this.sensorReport) {
      this.sensorReport = []
    }
    this.sensorReport = this.sensorReport.filter(elem => elem !== sensorReport)
    return this
  }

  /**
   * Remove each sensorReport from the "sensorReportList" field
   * @param {Array<SensorReportElement>} sensorReportList - the sensorReports to remove
   * @return {SensorElement} - the objectEvent instance
   */
  removeSensorReportList (sensorReportList) {
    if (!this.sensorReport) {
      this.sensorReport = []
    }
    sensorReportList.forEach(sensorReportElement => this.removeSensorReport(sensorReportElement))
    return this
  }

  /**
   * Return a JSON object corresponding to the SensorElement object
   */
  toJSON () {
    const json = {}

    for (const prop in this) {
      if (this.hasOwnProperty(prop)) {
        if (prop === 'sensorReport') {
          json[prop] = []
          this[prop].forEach(e => json[prop].push(e.toJSON()))
        } else if (prop === 'sensorMetadata') {
          json[prop] = this[prop].toJSON()
        } else {
          json[prop] = this[prop]
        }
      }
    }

    return json
  }
}
