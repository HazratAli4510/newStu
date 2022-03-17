import dbConnect from "../../db/dbConnect"
import Student from '../../models/Students'

dbConnect()
export default async function handler(req, res) {
  const { method } = req
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


    default:
      res.status(500).json({ success: false })
      break;
  }


}
