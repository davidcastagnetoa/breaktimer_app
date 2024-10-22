import React from "react";
import { Link } from "@radix-ui/themes";
import { Header } from "./Header";
import { useLocation } from "react-router-dom";
import { useMobileMenuContext } from "./MobileMenu";

export const MainHeader = () => {
  const location = useLocation();

  return (
    <Header gitHubLink="https://github.com/radix-ui/primitives">
      <Link size="2" color="gray" href="/primitives/docs" highContrast={location.pathname.includes("/primitives/docs")}>
        Documentation
      </Link>
      <Link
        size="2"
        color="gray"
        href="/primitives/case-studies"
        highContrast={location.pathname.includes("/primitives/case-studies")}
      >
        Case studies
      </Link>
    </Header>
  );
};
