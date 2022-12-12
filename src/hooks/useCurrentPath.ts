import { matchRoutes, useLocation } from "react-router-dom"

import { router } from "./../Router"


export const useCurrentPath = () => {
  const location = useLocation()
  const [{ route }]: any = matchRoutes(router.routes, location);

  return route.path
}
