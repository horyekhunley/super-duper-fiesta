import express from 'express'
import {
	getPatients,
	getPatientById,
	createPatient,
	updatePatient,
	deletePatient,
} from '../controller/patient_controller.js'

const router = express.Router()

router.route('/').get(getPatients).post(createPatient)

router
	.route('/:id')
	.get(getPatientById)
	.put(updatePatient)
	.delete(deletePatient)

export default router
