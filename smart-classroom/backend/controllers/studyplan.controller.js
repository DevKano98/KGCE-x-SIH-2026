import { getStudyPlan } from '../services/studyplan.service.js';

export async function getMyStudyPlan(req, res) {
  const { id } = req.user;
  try {
    const plan = await getStudyPlan(id);
    res.json(plan);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to generate study plan' });
  }
}