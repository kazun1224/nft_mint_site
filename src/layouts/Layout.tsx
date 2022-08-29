import { CustomLayout } from "next";
import Head from "next/head";
import { FC } from "react";
import { Footer } from "src/layouts/Footer";
import { Header } from "src/layouts/Header";

export const Layout: CustomLayout = (props) => {
  return (
    <>
      <Head>
        <title>mumbai mint site</title>
      </Head>
      <Header />
      <main>{props.children}</main>
      <Footer />
    </>
  );
};
