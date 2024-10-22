import RadixStyles from "../Header.module.css";
import React, { useEffect, useState } from "react";
import { RemoveScroll } from "react-remove-scroll";
import { classNames } from "../utils/classNames";
import { RadixLogo, RadixLogoIcon } from "./RadixLogo";
import { useLocation } from "react-router-dom";
import {
  AccessibleIcon,
  Badge,
  Box,
  Button,
  Card,
  Flex,
  Grid,
  Heading,
  IconButton,
  Inset,
  Link,
  Select,
  Separator,
  Strong,
  Text,
  TextArea,
  TextField,
  Theme,
  Tooltip,
} from "@radix-ui/themes";

import {
  BookmarkFilledIcon,
  BookmarkIcon,
  CalendarIcon,
  CrumpledPaperIcon,
  FontBoldIcon,
  FontItalicIcon,
  GitHubLogoIcon,
  HamburgerMenuIcon,
  ImageIcon,
  InstagramLogoIcon,
  MagicWandIcon,
  MagnifyingGlassIcon,
  RulerHorizontalIcon,
  StrikethroughIcon,
  TextAlignCenterIcon,
  TextAlignLeftIcon,
  TextAlignRightIcon,
  VideoIcon,
} from "@radix-ui/react-icons";
import { Label } from "@radix-ui/react-label";
import { ThemeToggle } from "./ThemeToggle";
import { useMobileMenuContext } from "./MobileMenu";

export const Header = ({ children, gitHubLink, ghost }) => {
  const mobileMenu = useMobileMenuContext();
  const location = useLocation();
  const [scrollState, setScrollState] = useState("at-top");

  useEffect(() => {
    let previousScrollY = window.scrollY;

    const handleScroll = () => {
      const direction = previousScrollY < window.scrollY ? "scrolling-down" : "scrolling-up";
      const state = window.scrollY < 30 ? "at-top" : direction;
      previousScrollY = window.scrollY;
      setScrollState(state);
    };

    if (ghost) {
      window.addEventListener("scroll", handleScroll, { passive: true });
    } else {
      window.removeEventListener("scroll", handleScroll);
    }

    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [ghost]);

  return (
    <Theme asChild className="radix-themes-custom-fonts">
      <div
        data-scroll-state={scrollState}
        data-mobile-menu-open={mobileMenu.open}
        className={classNames(RadixStyles.HeaderRoot, ghost ? RadixStyles.ghost : "")}
      >
        <div className={RadixStyles.HeaderInner}>
          <div
            className={RemoveScroll.classNames.fullWidth}
            style={{
              position: "absolute",
              height: "inherit",
              top: 0,
              left: 0,
              right: 0,
            }}
          >
            {/* Mobile Screen */}
            <Flex display={{ sm: "none" }} align="center" position="absolute" top="0" bottom="0" left="0" pl="4">
              {mobileMenu.open ? (
                <Link href="/">
                  {/* <BoxLink> */}
                  <AccessibleIcon label="Radix Homepage">
                    <RadixLogoIcon />
                  </AccessibleIcon>
                  {/* </BoxLink> */}
                </Link>
              ) : (
                <RadixByWorkOSLogoLink />
              )}
            </Flex>

            {/* Website Screen */}
            <Flex
              display={{ initial: "none", sm: "flex" }}
              align="center"
              position="absolute"
              top="0"
              bottom="0"
              left="0"
              pl="4"
            >
              <RadixByWorkOSLogoLink />
            </Flex>

            <div className={RadixStyles.HeaderProductLinksContainer}>
              <HeaderProductLink href="/" active={location.pathname === "/" || location.pathname.startsWith("/themes")}>
                Themes
              </HeaderProductLink>
              <HeaderProductLink href="/primitives" active={location.pathname.startsWith("/primitives")}>
                Primitives
              </HeaderProductLink>
              <HeaderProductLink href="/icons" active={location.pathname.startsWith("/icons")}>
                Icons
              </HeaderProductLink>
              <HeaderProductLink href="/colors" active={location.pathname.startsWith("/colors")}>
                Colors
              </HeaderProductLink>
            </div>

            <Flex
              display={{ initial: "none", md: "flex" }}
              align="center"
              gap="5"
              position="absolute"
              top="0"
              bottom="0"
              right="0"
              pr="4"
            >
              {children}

              <Link size="2" color="gray" href="/blog" highContrast={location.pathname.includes("/blog")}>
                Blog
              </Link>

              {gitHubLink && (
                <Tooltip className="radix-themes-custom-fonts" content="View GitHub">
                  <IconButton asChild size="3" variant="ghost" color="gray">
                    <a href={gitHubLink} target="_blank" aria-label="View GitHub">
                      <GitHubLogoIcon width="16" height="16" />
                    </a>
                  </IconButton>
                </Tooltip>
              )}

              <ThemeToggle />
            </Flex>

            <Flex
              display={{ md: "none" }}
              align="center"
              gap="4"
              position="absolute"
              top="0"
              bottom="0"
              right="0"
              pr="4"
            >
              <div className={RadixStyles.HeaderThemeToggleContainer}>
                <ThemeToggle />
              </div>

              <Tooltip className="radix-themes-custom-fonts" content="Navigation">
                <IconButton
                  size="3"
                  variant="ghost"
                  color="gray"
                  data-state={mobileMenu.open ? "open" : "closed"}
                  onClick={() => mobileMenu.setOpen((open) => !open)}
                  className={RadixStyles.MobileMenuButton}
                >
                  <HamburgerMenuIcon width="16" height="16" />
                </IconButton>
              </Tooltip>
            </Flex>
          </div>
        </div>
      </div>
    </Theme>
  );
};

const HeaderProductLink = ({ active, children, href = "", ...props }) => (
  <Link href={href}>
    {" "}
    //!This is the error
    <a data-state={active ? "active" : "inactive"} className={RadixStyles.HeaderProductLink} {...props}>
      <span className={RadixStyles.HeaderProductLinkInner}>{children}</span>
      <span className={RadixStyles.HeaderProductLinkInnerHidden}>{children}</span>
    </a>
  </Link>
);

const RadixByWorkOSLogoLink = () => (
  <Flex align="center" gap="3">
    <Link href="/">
      {/* <BoxLink> */}
      <AccessibleIcon label="Radix Homepage">
        <RadixLogo />
      </AccessibleIcon>
      {/* </BoxLink> */}
    </Link>

    <div
      style={{
        background: "currentcolor",
        opacity: 0.15,
        width: 1,
        height: 24,
      }}
    />

    {/* <BoxLink href="https://workos.com" target="_blank"> */}
    <AccessibleIcon label="Made by WorkOS">
      <svg width="85" height="24" viewBox="0 0 85 24" fill="currentcolor" xmlns="http://www.w3.org/2000/svg">
        <path d="..." />
      </svg>
    </AccessibleIcon>
    {/* </BoxLink> */}
  </Flex>
);
