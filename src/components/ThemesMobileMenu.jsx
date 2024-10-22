"use client";
import { themesRoutes } from "../utils/themesRoutes";
import { Box, ScrollArea } from "@radix-ui/themes";
import { MainHeader } from "./MainHeader";
import { DocsNav } from "./DocsNav";
import { MobileMenu } from "./MobileMenu";
import { GitHubLogoIcon } from "@radix-ui/react-icons";

export const ThemesMobileMenu = () => (
  <MobileMenu>
    <MainHeader />
    <ScrollArea>
      <Box pt="4" px="3" pb="9">
        <DocsNav
          routes={[
            {
              pages: [
                {
                  title: "Homepage",
                  slug: "",
                },
                {
                  title: "Playground",
                  slug: "themes/playground",
                },
                {
                  title: "Blog",
                  slug: "blog",
                },
              ],
            },
            ...themesRoutes,
            {
              label: "Resources",
              pages: [
                {
                  title: "GitHub",
                  slug: "https://github.com/radix-ui/themes",
                  icon: <GitHubLogoIcon />,
                },
              ],
            },
          ]}
        />
      </Box>
    </ScrollArea>
  </MobileMenu>
);
