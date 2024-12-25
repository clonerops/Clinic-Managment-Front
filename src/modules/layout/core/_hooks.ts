import { useQuery } from "@tanstack/react-query";
import { getAllMenuItems, getMenuItems } from "./_requests";

export const useMenuItems = () => useQuery({
    queryKey: ["menuItems"],
    queryFn: () => getMenuItems(),
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchIntervalInBackground: false
});

export const useAllMenuItems = () => useQuery({
    queryKey: ["menuAllItems"],
    queryFn: () => getAllMenuItems(),
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchIntervalInBackground: false
});
