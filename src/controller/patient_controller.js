import database from '../config/mysql_config.js'
import Response from '../domain/response.js'
import logger from '../util/logger.js'
import QUERY from '../query/patient_query.js'

const HttpStatus = {
	OK: { code: 200, status: 'OK' },
	CREATED: { code: 201, status: 'CREATED' },
	NO_CONTENT: { code: 204, status: 'NO_CONTENT' },
	BAD_REQUEST: { code: 400, status: 'BAD_REQUEST' },
	UNAUTHORIZED: { code: 401, status: 'UNAUTHORIZED' },
	FORBIDDEN: { code: 403, status: 'FORBIDDEN' },
	NOT_FOUND: { code: 404, status: 'NOT_FOUND' },
	CONFLICT: { code: 409, status: 'CONFLICT' },
	INTERNAL_SERVER_ERROR: { code: 500, status: 'INTERNAL_SERVER_ERROR' },
}

export const getPatients = async (req, res) => {
	logger.info(`${req.method} ${req.originalUrl}, Getting all patients`)
	database.query(QUERY.SELECT_PATIENTS, (err, results) => {
		if (!results) {
			res.send(
				new Response(
					HttpStatus.OK.code,
					HttpStatus.OK.status,
					'No patients found'
				)
			)
		} else {
			res.send(
				new Response(
					HttpStatus.OK.code,
					HttpStatus.OK.status,
					'Patients found',
					{ patients: results }
				)
			)
		}
	})
}
export const createPatient = async (req, res) => {
	logger.info(`${req.method} ${req.originalUrl}, Creating a new patient`)
	database.query(
		QUERY.CREATE_PATIENT,
		Object.values(req.body),
		(err, results) => {
			if (!results) {
				logger.error(error.message)
				res.send(
					new Response(
						HttpStatus.INTERNAL_SERVER_ERROR.code,
						HttpStatus.INTERNAL_SERVER_ERROR.status,
						'Error creating patient'
					)
				)
			} else {
				const patient = {
					id: results.insertId,
					...req.body,
					created_at: new Date(),
				}
				res.send(
					new Response(
						HttpStatus.CREATED.code,
						HttpStatus.CREATED.status,
						'Patient created',
						{ patient }
					)
				)
			}
		}
	)
}
export const getPatientById = async (req, res) => {
	logger.info(
		`${req.method} ${req.originalUrl}, Fetching patient ${req.params.id} data`
	)
	database.query(QUERY.SELECT_PATIENT, [req.params.id], (err, results) => {
		if (!results[0]) {
			res.send(
				new Response(
					HttpStatus.NOT_FOUND.code,
					HttpStatus.NOT_FOUND.status,
					`Patient ${req.params.id} data not found`
				)
			)
		} else {
			res.send(
				new Response(
					HttpStatus.OK.code,
					HttpStatus.OK.status,
					'Patient ${req.params.id} data found',
					results[0]
				)
			)
		}
	})
}
export const updatePatient = (req, res) => {
	logger.info(`${req.method} ${req.originalUrl}, fetching patient`)
	database.query(QUERY.SELECT_PATIENT, [req.params.id], (error, results) => {
		if (!results[0]) {
			res.send(
				new Response(
					HttpStatus.NOT_FOUND.code,
					HttpStatus.NOT_FOUND.status,
					`Patient by id ${req.params.id} was not found`
				)
			)
		} else {
			logger.info(`${req.method} ${req.originalUrl}, updating patient`)
			database.query(
				QUERY.UPDATE_PATIENT,
				[...Object.values(req.body), req.params.id],
				(error, results) => {
					if (!error) {
						res.send(
							new Response(
								HttpStatus.OK.code,
								HttpStatus.OK.status,
								`Patient updated`,
								{ id: req.params.id, ...req.body }
							)
						)
					} else {
						logger.error(error.message)
						res.send(
							new Response(
								HttpStatus.INTERNAL_SERVER_ERROR.code,
								HttpStatus.INTERNAL_SERVER_ERROR.status,
								`Error occurred`
							)
						)
					}
				}
			)
		}
	})
}

export const deletePatient = (req, res) => {
	logger.info(`${req.method} ${req.originalUrl}, deleting patient`)
	database.query(QUERY.DELETE_PATIENT, [req.params.id], (error, results) => {
		if (results.affectedRows > 0) {
			res.send(
				new Response(
					HttpStatus.OK.code,
					HttpStatus.OK.status,
					`Patient ${req.params.id} deleted`,
					results[0]
				)
			)
		} else {
			res.send(
				new Response(
					HttpStatus.NOT_FOUND.code,
					HttpStatus.NOT_FOUND.status,
					`Patient by id ${req.params.id} was not found`
				)
			)
		}
	})
}

export default HttpStatus
