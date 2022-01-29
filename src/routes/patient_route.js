import express from 'express'
import {
	getPatient,
	getPatientById,
	createPatient,
	updatePatient,
	deletePatient,
} from './src/controller/patient_controller'

const router = express.Router()

router.route('/').get(getPatient).post(createPatient)

router
	.route('/:id')
	.get(getPatientById)
	.put(updatePatient)
	.delete(deletePatient)

export default router
