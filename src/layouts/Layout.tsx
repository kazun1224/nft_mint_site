import { CustomLayout } from "next";
import Head from "next/head";
import { usePageLoading } from "src/hooks/usePageLoading";
import { Footer } from "src/layouts/Footer";
import { Header } from "src/layouts/Header";
import { useViewportSize } from "@mantine/hooks";

export const Layout: CustomLayout = (props) => {
  const { pageLoading, loadingComponent } = usePageLoading();
  const { width } = useViewportSize();

  return (
    <>
      <Head>
        <title>mumbai mint site</title>
        <meta
          name="description"
          content="This site can mint NFTs in parallel space on polygon networks."
        ></meta>
        {width > 360 ? (
          <meta name="viewport" content="width=device-width" />
        ) : (
          <meta name="viewport" content="width=360" />
        )}
      </Head>
      <div className="body">
        {pageLoading ? (
          loadingComponent
        ) : (
          <>
            <Header />
            <main className="inner--main">{props.children}</main>
            <Footer />
          </>
        )}
      </div>
    </>
  );
};
