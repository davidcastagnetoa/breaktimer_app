import React from "react";
import { Link } from "react-router-dom";
import { Text, Heading, Box, Badge, Flex } from "@radix-ui/themes";
import { classNames } from "../utils/classNames";
import { useCurrentPageSlug } from "../utils/useCurrentPageSlug";
import styles from "./DocsNav.module.css";
import scrollIntoView from "scroll-into-view-if-needed";

export const DocsNav = ({ routes }) => {
  const currentPageSlug = useCurrentPageSlug(); // Aquí asumo que `useCurrentPageSlug` es una función que ya tienes en tu proyecto

  return (
    <Box>
      {routes.map((section, i) => (
        <Box key={section.label ?? i} mb="4">
          {section.label && (
            <Box py="2" px="3">
              <Heading as="h4" size={{ initial: "3", md: "2" }}>
                {section.label}
              </Heading>
            </Box>
          )}

          {section.pages.map((page) => (
            <DocsNavItem key={page.slug} href={page.slug} active={currentPageSlug === page.slug}>
              <Flex gap="2" align="center">
                {page.icon}
                <Text size={{ initial: "3", md: "2" }}>{page.title}</Text>
              </Flex>

              {page.preview && (
                <Badge ml="2" color="gray" radius="full" variant="surface">
                  Preview
                </Badge>
              )}

              {page.deprecated && (
                <Badge ml="2" color="gray" radius="full" variant="surface">
                  Deprecated
                </Badge>
              )}
            </DocsNavItem>
          ))}
        </Box>
      ))}
    </Box>
  );
};

const DocsNavItem = ({ active, disabled, href, ...props }) => {
  const className = classNames(styles.DocsNavItem, active && styles.active);
  const isExternal = href.startsWith("http");
  const ref = React.useRef(null);

  React.useEffect(() => {
    if (ref.current && active) {
      const container = document.querySelector("[data-radix-scroll-area-viewport]");

      if (!container) {
        return;
      }

      scrollIntoView(ref.current, {
        block: "nearest",
        scrollMode: "if-needed",
        boundary: (parent) => Boolean(container.contains(parent)),
        behavior: (actions) => {
          actions.forEach(({ el, top }) => {
            const dir = el.scrollTop < top ? 1 : -1;
            el.scrollTop = top + 80 * dir;
          });
        },
      });
    }
  }, [active]);

  if (disabled) {
    return <span ref={ref} className={className} {...props} />;
  }

  if (isExternal) {
    return <a ref={ref} className={className} href={href} target="_blank" rel="noopener" {...props} />;
  }

  return <Link ref={ref} className={className} to={`/${href}`} {...props} />;
};
