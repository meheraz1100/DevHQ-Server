import { Router } from 'express';

import { TeamController } from '../controllers/team.controller';

import { asyncHandler } from '../../../utils/asyncHandler';
import { validate } from '../../../middlewares/validate.middleware';
import { authenticate } from '../../../middlewares/auth.middleware';

import { createTeamSchema } from '../validators/create-team.validator';
import { updateTeamSchema } from '../validators/update-team.validator';
import { inviteMemberSchema } from '../validators/invite-member.validator';
import { acceptInvitationSchema } from '../validators/accept-invitation.validator';
import projectRoutes from '../../project/routes/project.routes';

const router = Router();

router.post('/', authenticate, validate(createTeamSchema), asyncHandler(TeamController.create));
router.get('/', authenticate, asyncHandler(TeamController.getMyTeams));
router.get('/admin/members', authenticate, asyncHandler(TeamController.getMembersForAdmin));
router.get('/:id', authenticate, asyncHandler(TeamController.getById));

router.patch('/:id', authenticate, validate(updateTeamSchema), asyncHandler(TeamController.update));

router.delete('/:id', authenticate, asyncHandler(TeamController.delete));
router.post(
  '/:id/invitations',
  authenticate,
  validate(inviteMemberSchema),
  asyncHandler(TeamController.inviteMember),
);
router.post(
  '/invitations/accept',
  authenticate,
  validate(acceptInvitationSchema),
  asyncHandler(TeamController.acceptInvitation),
);
router.use('/:teamId/projects', projectRoutes);
router.get('/invitations/me', authenticate, asyncHandler(TeamController.getMyInvitations));
router.delete('/invitations/:id', authenticate, asyncHandler(TeamController.declineInvitation));

export default router;
