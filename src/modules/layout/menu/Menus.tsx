// import { useEffect, useState } from "react";
// import { useMenuItems } from "../core/_hooks";
import { IMenu } from "./_model";
import MenuItem from "./MenuItem";
// import { IMenuItem } from "../core/_models";
// import { parseMenuItems } from "./parseMenuItems";
import { MenuData } from "./MenuData";

const Menus = () => {
    
    return (
        <div className="py-8">
            {MenuData?.map((item: IMenu, index: number) => (
                <ul
                    key={index}
                    className={`flex flex-col my-4 space-y-2 transition-all !duration-700 overflow-hidden whitespace-nowrap`}
                >
                    <MenuItem
                        key={index}
                        title={item.title}
                        subMenus={item.subMenu}
                        url={item.url}
                        icon={item.icon}
                    />
                </ul>
            ))}
        </div>
    );
};

export default Menus;
