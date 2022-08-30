import type { CustomNextPage } from "next";
import { Layout } from "src/layouts";
import { Button, useMediaQuery, useViewportSize } from "src/lib/mantine";

const Start: CustomNextPage = () => {
  const { width } = useViewportSize();
  const largerThanXs = useMediaQuery("xs");
  const largerThanSm = useMediaQuery("sm");
  const largerThanMd = useMediaQuery("md");
  const largerThanLg = useMediaQuery("lg");
  const largerThanXl = useMediaQuery("xl");

  const handleClick = () => {
    console.log("Hello!");
  };

  return (
    <div className="p-20">
      <div className="bg-fuchsia-200 xs:bg-red-200 sm:bg-amber-200 md:bg-lime-200 lg:bg-emerald-200 xl:bg-cyan-200">
        <div>{`width: ${width}`}</div>
        <div>{`largerThanXs: ${largerThanXs}`}</div>
        <div>{`largerThanSm: ${largerThanSm}`}</div>
        <div>{`largerThanMd: ${largerThanMd}`}</div>
        <div>{`largerThanLg: ${largerThanLg}`}</div>
        <div>{`largerThanXl: ${largerThanXl}`}</div>
      </div>
      <Button dent onClick={handleClick} className="mt-4 block">
        Click me!
      </Button>
      <Button onClick={handleClick} className="mt-4 block">
        Click me!
      </Button>
    </div>
  );
};

Start.getLayout = (page) => <Layout>{page}</Layout>;

export default Start;
