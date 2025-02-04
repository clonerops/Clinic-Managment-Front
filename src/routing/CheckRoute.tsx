// import { Suspense, useCallback, useMemo } from "react";
// // import { useMenuItems } from "../modules/layout/core/_hooks";
// import { Navigate, useLocation } from "react-router-dom";
// import { matchPath, matchRoutes } from "react-router";
// import { PrivateRoutes, routes as privateArrayRoutes } from "./PrivateRoutes";
// import AccessDenied from "./AccessDenied";
// import LazyLoad from "../../_cloner/components/LazyLoad";

import { Suspense, useCallback, useMemo } from "react";
import { matchPath, matchRoutes, Navigate } from "react-router-dom";
import { PrivateRoutes } from "./PrivateRoutes";
import AccessDenied from "./AccessDenied";
import LazyLoad from "../_cloner/components/shared/LazyLoad";
import Dashboard from "../modules/Dashboard";

// const CheckRoute = () => {
//   const { data } = useMenuItems();
//   const location = useLocation();
//   const overRoutes = [
//     // {
//     //   path: "dashboard/users/updateUser/:id",
//     //   element: <UserForm />,
//     //   accessUrl: "/dashboard/users",
//     // },
//     // {
//     //   path: "dashboard/users/role/:id",
//     //   element: <RoleUser />,
//     //   accessUrl: "/dashboard/users",
//     // },
//     {
//       path: "auth/*",
//       element: <Navigate to="/dashboard" />,
//     },
//   ];

//   const routes = useMemo(() => {
//     let result: typeof data.data = [];

//     data?.data?.forEach((node: any) => {
//       result.push({ path: node.accessUrl });
//       if (node?.children?.length)
//         node.children?.forEach((item: any) => {
//           result.push({ path: item?.accessUrl });
//         });
//     });

//     return result?.flat();
//     // eslint-disable-next-line
//   }, [data?.data, window.location.pathname]);

//   const checkRoute = useCallback(() => {
//     let finded: boolean = false;

//     const newRoutes = [...routes, ...overRoutes];
//     if (!finded) {
//       newRoutes?.forEach((r: any) => {
//         if (
//           matchPath(location.pathname, "/" + r.path)
//           // matchPath(location.pathname, "/" + r.path + "/:id")
//         ) {
//           finded = true;
//         }
//       });
//       if (newRoutes?.length) {
//         if (
//           location.pathname === "/dashboard" ||
//           location.pathname === "dashboard/" ||
//           location.pathname === "/dashboard/" ||
//           finded
//         ) {
//           return <PrivateRoutes />;
//         } else {
//           var routeMatchedFromPrivateRoute = matchRoutes(
//             [...privateArrayRoutes, ...overRoutes] as any,
//             location,
//           );

//           if (
//             // @ts-ignore
//             routeMatchedFromPrivateRoute?.[0]?.route?.element &&
//             !matchRoutes(routes, location)?.length
//           ) {
//             const findedRoute = overRoutes.find(
//               (node) =>
//                 node.path ===
//                 matchRoutes(overRoutes, location)?.[0]?.route?.path,
//             );

//             if (
//               (findedRoute &&
//                 // @ts-ignore
//                 matchRoutes(routes, findedRoute?.accessUrl || "")?.length) ||
//               // @ts-ignore
//               matchRoutes(privateArrayRoutes, location)?.[0]?.route?.element
//                 ?.props?.to === "/error/404" ||
//               !findedRoute?.accessUrl
//             ) {
//               return <PrivateRoutes />;
//             }

//             return <AccessDenied />;
//           }
//           return <AccessDenied />;
//         }
//       }
//     }
//      // eslint-disable-next-line
//   }, [routes]);

//   // if (isLoading) {
//   //   return <LazyLoad loading={isLoading} />;
//   // }

//   return (
//     <Suspense fallback={<LazyLoad loading={true} />}>{checkRoute()}</Suspense>
//   );
// };

// export default CheckRoute;


const CheckRoute = () => {
    const overRoutes = [
    {
      path: "auth/*",
      element: <Navigate to="/dashboard" />,
    },
  ];

    const routes = useMemo(() => {
    // let result: typeof data.data = [];
    let result = [];

    // data?.data?.forEach((node: any) => {
    //   result.push({ path: node.accessUrl });
    //   if (node?.children?.length)
    //     node.children?.forEach((item: any) => {
    //       result.push({ path: item?.accessUrl });
    //     });
    // });

    // return result?.flat();
    return [];
    // eslint-disable-next-line
  // }, [data?.data, window.location.pathname]);
  }, [window.location.pathname]);



    const checkRoute: any = useCallback(() => {
    let finded: boolean = false;

    const newRoutes = [...routes, ...overRoutes];
    // if (!finded) {
    //   newRoutes?.forEach((r: any) => {
    //     if (
    //       matchPath(location.pathname, "/" + r.path)
    //       // matchPath(location.pathname, "/" + r.path + "/:id")
    //     ) {
    //       finded = true;
    //     }
    //   });
      
    //   // if (newRoutes?.length) {
    //   //   if (
    //   //     location.pathname === "/dashboard" ||
    //   //     location.pathname === "dashboard/" ||
    //   //     location.pathname === "/dashboard/" ||
    //   //     finded
    //   //   ) {
    //   //     return <PrivateRoutes />;
    //   //   } else {
    //   //     var routeMatchedFromPrivateRoute = matchRoutes(
    //   //       [...overRoutes] as any,
    //   //       location,
    //   //     );

    //   //     if (
    //   //       // @ts-ignore
    //   //       routeMatchedFromPrivateRoute?.[0]?.route?.element &&
    //   //       !matchRoutes(routes, location)?.length
    //   //     ) {
    //   //       const findedRoute = overRoutes.find(
    //   //         (node) =>
    //   //           node.path ===
    //   //           matchRoutes(overRoutes, location)?.[0]?.route?.path,
    //   //       );

    //   //       if (
    //   //         (findedRoute &&
    //   //           // @ts-ignore
    //   //           matchRoutes(routes, findedRoute?.accessUrl || "")?.length) ||
    //   //         // @ts-ignore
    //   //         matchRoutes(privateArrayRoutes, location)?.[0]?.route?.element
    //   //           ?.props?.to === "/error/404"
    //   //       ) {
    //   //         return <PrivateRoutes />;
    //   //       }

    //   //       return <AccessDenied />;
    //   //     }
    //   //     return <AccessDenied />;
    //   //   }
    //   // }
    // }
     // eslint-disable-next-line
  }, []);




  return (
        <Suspense fallback={<LazyLoad loading={true} />}>
          <PrivateRoutes />
          {/* {checkRoute()} */}
          </Suspense>

  )
}

export default CheckRoute