"use client";

import Link from "next/link";
import { useState, useRef } from "react";

import Popper from "@mui/material/Popper";
import Grow from "@mui/material/Grow";
import Paper from "@mui/material/Paper";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import MenuList from "@mui/material/MenuList";
import MenuItem from "@mui/material/MenuItem";

import { menuData } from "@/utils/data";
import { changeToInitialAction } from "@/store/actions/products";
import { setIsOpenMenuAction } from "@/store/actions/common";
import { useCommon } from "@/store/selectors";

function handleListKeyDown(event) {
  if (event.key === "Tab") {
    event.preventDefault();
    setIsOpenMenuAction(false);
  } else if (event.key === "Escape") {
    setIsOpenMenuAction(false);
  }
}

const Menu = ({ anchorRef }) => {
  const [submenu, setSubmenu] = useState(null);
  const [subtab, setSubtab] = useState(null);
  const submenuRef = useRef(null);
  const subsubRef = useRef(null);
  const lastTabRef = useRef(null);
  const { isOpenMenu } = useCommon();
  const menu = Object.keys(menuData);

  const tabMenu = (tab) => {
    const result = Object.keys(menuData[tab]);
    return result;
  };

  const subMenu = (tab) => {
    const currentMenu = menuData[submenu];
    return Object.keys(currentMenu[tab]);
  };

  const openMenu = (value) => {
    setSubmenu(value);
  };

  const openSubMenu = (value) => {
    setSubtab(value);
  };

  const onChooseItem = (item) => {
    // console.log(item);
  };

  const getLink = (item) => {
    changeToInitialAction();
    const routeText = menuData[submenu][subtab][item];
    const route = String(routeText)?.replace("-", "/");
    return route;
  };

  const onClose = () => {
    setIsOpenMenuAction(false);
  };

  return (
    <div className="relative">
      <Popper
        open={isOpenMenu}
        anchorEl={anchorRef}
        role={undefined}
        placement="right-start"
        transition
        disablePortal
        sx={{ "z-index": "20" }}
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin:
                placement === "bottom-start" ? "left top" : "left bottom",
            }}
          >
            <Paper>
              <ClickAwayListener onClickAway={() => setIsOpenMenuAction(false)}>
                <MenuList
                  autoFocusItem={open}
                  id="composition-menu"
                  aria-labelledby="composition-button"
                  onKeyDown={handleListKeyDown}
                >
                  {menuData &&
                    menu &&
                    menu?.map((tab) => (
                      <MenuItem
                        key={tab}
                        onClick={() => openMenu(tab)}
                        sx={{ display: "block" }}
                        ref={submenuRef}
                      >
                        {tab}
                        {submenu && submenu === tab && (
                          <MenuList
                            autoFocusItem={open}
                            aria-labelledby="composition-button"
                            onKeyDown={handleListKeyDown}
                          >
                            {tabMenu(tab).map((item) => (
                              <MenuItem
                                key={item}
                                onClick={() => openSubMenu(item)}
                                sx={{ display: "block" }}
                                ref={subsubRef}
                              >
                                {item}
                                {subtab && subtab === item && (
                                  <MenuList
                                    autoFocusItem={open}
                                    aria-labelledby="composition-button"
                                    onKeyDown={handleListKeyDown}
                                  >
                                    {subMenu(item).map((item, index) => (
                                      <Link href={getLink(item)}>
                                        <MenuItem
                                          key={index}
                                          onClick={() => onChooseItem(item)}
                                          sx={{ display: "block" }}
                                          ref={lastTabRef}
                                        >
                                          {item}
                                        </MenuItem>
                                      </Link>
                                    ))}
                                  </MenuList>
                                )}
                              </MenuItem>
                            ))}
                          </MenuList>
                        )}
                      </MenuItem>
                    ))}
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </div>
  );
};

export default Menu;
