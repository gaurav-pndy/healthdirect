const express = require('express');
const router = express.Router();

// In-memory data store for applications (for demonstration purposes)
let applications = [
  { id: 1, name: 'Amanda Chavez', age: 36, gender: 'female', service: 'Physiotherapy', appointmentDate: '23 Mar 2025', timeOfRequest: '10:00 - 10:30', applNo: '1234 6546 897', status: 'new' },
  { id: 2, name: 'Randy Elliot', age: 36, gender: 'male', service: 'Physiotherapy', appointmentDate: '23 Mar 2025', timeOfRequest: '10:00 - 10:30', applNo: '1234 6546 897', status: 'progress' },
  { id: 3, name: 'Jasmine Palmer', age: 36, gender: 'female', service: 'Physiotherapy', appointmentDate: '23 Mar 2025', timeOfRequest: '10:00 - 10:30', applNo: '1234 6546 897', status: 'finished' },
];

// GET all applications
router.get('/', (req, res) => {
  res.json(applications);
});

// GET a single application by ID
router.get('/:id', (req, res) => {
  const application = applications.find(app => app.id === parseInt(req.params.id));
  if (!application) {
    return res.status(404).json({ message: 'Application not found' });
  }
  res.json(application);
});

// POST a new application
router.post('/', (req, res) => {
  const newApplication = {
    id: applications.length ? applications[applications.length - 1].id + 1 : 1,
    ...req.body,
    status: req.body.status || 'new', // Default to 'new' if status is not provided
  };
  applications.push(newApplication);
  res.status(201).json(newApplication);
});

// PUT (update) an existing application
router.put('/:id', (req, res) => {
  const applicationIndex = applications.findIndex(app => app.id === parseInt(req.params.id));
  if (applicationIndex === -1) {
    return res.status(404).json({ message: 'Application not found' });
  }
  applications[applicationIndex] = { ...applications[applicationIndex], ...req.body };
  res.json(applications[applicationIndex]);
});

// DELETE an application
router.delete('/:id', (req, res) => {
  const applicationIndex = applications.findIndex(app => app.id === parseInt(req.params.id));
  if (applicationIndex === -1) {
    return res.status(404).json({ message: 'Application not found' });
  }
  const deletedApplication = applications.splice(applicationIndex, 1);
  res.json(deletedApplication[0]);
});

module.exports = router;