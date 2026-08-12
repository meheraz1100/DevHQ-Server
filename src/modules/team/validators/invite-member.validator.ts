// import { TeamRole } from '@prisma/client';
// import { z } from 'zod';

// export const inviteMemberSchema = z.object({
//   email: z.string().email(),

//   role: z.nativeEnum(TeamRole).default(TeamRole.MEMBER),
// });

import { z } from 'zod';
import { TeamRole } from '@prisma/client';

export const inviteMemberSchema = z.object({
  username: z
    .string()
    .trim()
    .min(3, 'Username must be at least 3 characters.')
    .max(30, 'Username is too long.'),

  role: z.nativeEnum(TeamRole),
});
