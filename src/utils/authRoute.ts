import { UserRole, roleAuthPage } from '@/constants/common';

export default function authRoute(role: string, currPath: string) {
  let isAuthRoute = false;
  if (currPath.startsWith(roleAuthPage[role])) isAuthRoute = true;
  return {
    isAuthRoute,
  };
}
