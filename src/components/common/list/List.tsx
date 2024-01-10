/* eslint-disable no-confusing-arrow */
import { Box } from "@mui/material";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import clsx from "clsx";
import { useEffect, useState } from "react";

import CollapseItemList from "../collapseItemList";
import ListStyled, { ListStyledContainer } from "./List.style";
import { usePathname } from "next/navigation";
import { useRouter } from "next/router";

export interface ListItemsI {
  id: string;
  icon: JSX.Element;
  text: string;
  href: string;
  subList?:
    | {
        id: string;
        icon?: JSX.Element;
        text: string;
        href: string;
      }[]
    | undefined;
}

interface ListPropsI {
  className?: string;
  ListItems: ListItemsI[];
}

export default function List({ className, ListItems }: ListPropsI) {
  const pathname = usePathname();
  const { push } = useRouter();

  const [selectedPathname, setSelectedPathname] = useState(pathname);

  const handleListItemClick = (href: string) => {
    setSelectedPathname(href);
  };

  useEffect(() => {
    setSelectedPathname(pathname);
  }, [pathname]);

  return (
    <ListStyledContainer>
      <ListStyled
        sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
        component="nav"
        aria-labelledby="nested-list-subheader"
        className={className}
      >
        {ListItems?.map((items) => (
          <div key={items.id}>
            {!items.subList ? (
              <Box
                onClick={() =>
                  !pathname.includes(items.href) && push(items.href)
                }
                key={items.id}
              >
                <ListItemButton
                  selected={pathname.includes(items.href)}
                  onClick={() => handleListItemClick(items.href)}
                  key={items.id}
                  className={clsx({
                    "active-item": pathname.includes(items.href),
                  })}
                >
                  <ListItemIcon>{items.icon}</ListItemIcon>
                  <ListItemText primary={items.text} />
                </ListItemButton>
              </Box>
            ) : (
              <>
                <CollapseItemList
                  items={items}
                  handleListItemClick={handleListItemClick}
                  selectedPathname={selectedPathname}
                  key={items.id}
                />
              </>
            )}
          </div>
        ))}
      </ListStyled>
    </ListStyledContainer>
  );
}
