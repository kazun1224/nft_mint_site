import "src/lib/tailwind.css";
import type { CustomAppPage } from "next/app";
import {
  ColorScheme,
  ColorSchemeProvider,
  MantineProvider,
} from "@mantine/core";
import { ChainId, ThirdwebProvider } from "@thirdweb-dev/react";
import { useState } from "react";
import { NotificationsProvider } from "@mantine/notifications";
import { RecoilRoot } from "recoil";

const MyApp: CustomAppPage = ({ Component, pageProps }) => {
  const [colorScheme, setColorScheme] = useState<ColorScheme>("light");
  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === "dark" ? "light" : "dark"));
  const getLayout = Component.getLayout ?? ((page) => page);
  return (
    <RecoilRoot>
      <ThirdwebProvider desiredChainId={ChainId.Polygon}>
        <ColorSchemeProvider
          colorScheme={colorScheme}
          toggleColorScheme={toggleColorScheme}
        >
          <MantineProvider
            theme={{ colorScheme }}
            withGlobalStyles
            withNormalizeCSS
          >
            <NotificationsProvider>
              {getLayout(<Component {...pageProps} />)}
            </NotificationsProvider>
          </MantineProvider>
        </ColorSchemeProvider>
      </ThirdwebProvider>
    </RecoilRoot>
  );
};

export default MyApp;
