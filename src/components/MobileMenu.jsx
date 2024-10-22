import * as React from "react";
import { createContext, useContext } from "react";
import { RemoveScroll } from "react-remove-scroll";
import { Slot } from "@radix-ui/react-slot";
import { Box, Portal, Theme } from "@radix-ui/themes";
import { useLocation } from "react-router-dom";

const MenuContext = createContext({
  open: false,
  setOpen: () => {},
});

export const MobileMenuProvider = ({ children }) => {
  const [open, setOpen] = React.useState(false);
  const location = useLocation();

  // Cierra el menú al cambiar de ruta
  React.useEffect(() => {
    setOpen(false);
  }, [location]);

  React.useEffect(() => {
    // Media query para cerrar el menú en pantallas grandes
    const mediaQueryList = window.matchMedia("(min-width: 1024px)");

    const handleChange = () => {
      setOpen((open) => (open ? !mediaQueryList.matches : false));
    };

    handleChange();
    mediaQueryList.addEventListener("change", handleChange);
    return () => mediaQueryList.removeEventListener("change", handleChange);
  }, []);

  return <MenuContext.Provider value={{ open, setOpen }}>{children}</MenuContext.Provider>;
};

export const useMobileMenuContext = () => {
  return useContext(MenuContext);
};

export const MobileMenu = ({ children }) => {
  const { open } = useMobileMenuContext();

  if (!open) {
    return null;
  }

  return (
    <Portal>
      <Theme className="radix-themes-custom-fonts">
        <RemoveScroll as={Slot} allowPinchZoom enabled>
          <Box
            position="fixed"
            inset="0"
            style={{
              zIndex: 1,
              display: "grid",
              gridTemplateRows: "auto minmax(0, 1fr)",
              backgroundColor: "var(--color-background)",
            }}
          >
            {children}
          </Box>
        </RemoveScroll>
      </Theme>
    </Portal>
  );
};
