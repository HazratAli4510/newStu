import dbConnect from "../../db/dbConnect"
import Student from '../../models/Students'

dbConnect()
export default async function handler(req, res) {
  const { method } = req
  const id = req?.body?.id
  switch (method) {
    case 'GET':
      try {
        const results = await Student.find({})
        res.json({ success: true, result: results })
      } catch (error) {
        res.status(500).json({ success: false })
      }
      break;

    case 'POST':
      try {
        const results = await Student.create(req.body)
        res.json({ success: true })
      } catch (error) {
        res.status(500).json({ success: false })
      }
      break;

    case 'DELETE':
      try {
        const results = await Student.deleteOne({ _id: id })
        res.json({ success: true })
      } catch (error) {
        res.status(500).json({ success: false })
      }
      break;


    default:
      res.status(500).json({ success: false })
      break;
  }


}
