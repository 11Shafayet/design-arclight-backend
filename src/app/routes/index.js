import { Router } from 'express';
import { UserRoutes } from '../module/User/user.route.js';
import { ProjectsRoutes } from '../module/projects/projects.route.js';
import sendEmail from '../../emailService.js';
const router = Router();

const moduleRoutes = [
  {
    path: '/users',
    route: UserRoutes,
  },
  {
    path: '/projects',
    route: ProjectsRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

router.post('/contact', async (req, res) => {
  const {
    name,
    email,
    businessName,
    socialMediaHandle,
    websiteURL,
    startDate,
    completionDate,
    interestedService,
    budget,
    description,
  } = req.body;

  // Ensure required fields are present
  if (!name || !email || !interestedService || !budget) {
    return res
      .status(400)
      .json({ message: 'Name, email, budget and service are required' });
  }

  console.log('Sending email to:', email);

  // Email Subject & Content
  const subject = `New Inquiry from ${name}`;
  const text = `You have received a new inquiry from ${name}.\n\nDetails:\n
- Email: ${email}
- Business Name: ${businessName || 'N/A'}
- Social Media Handle: ${socialMediaHandle || 'N/A'}
- Website URL: ${websiteURL || 'N/A'}
- Desired Start Date: ${startDate || 'N/A'}
- Desired Completion Date: ${completionDate || 'N/A'}
- Interested Service: ${interestedService}
- Budget: ${budget || 'N/A'}
- Description: ${description || 'N/A'}`;

  const html = `<h2>New Inquiry from ${name}</h2>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Business Name:</strong> ${businessName || 'N/A'}</p>
                <p><strong>Social Media Handle:</strong> ${
                  socialMediaHandle || 'N/A'
                }</p>
                <p><strong>Website URL:</strong> ${websiteURL || 'N/A'}</p>
                <p><strong>Desired Start Date:</strong> ${
                  startDate || 'N/A'
                }</p>
                <p><strong>Desired Completion Date:</strong> ${
                  completionDate || 'N/A'
                }</p>
                <p><strong>Interested Service:</strong> ${interestedService}</p>
                <p><strong>Budget:</strong> ${budget || 'N/A'}</p>
                <p><strong>Description:</strong> ${description || 'N/A'}</p>`;

  try {
    await sendEmail('contact@designarclight.com', subject, text, html);
    res.status(200).json({ message: 'Inquiry sent successfully' });
  } catch (error) {
    console.error('Failed to send email:', error);
    res
      .status(500)
      .json({ message: 'Failed to send email', error: error.message });
  }
});

export default router;
