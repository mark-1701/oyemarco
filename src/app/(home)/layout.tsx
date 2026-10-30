import { Footer, TopMenu } from '@/components';

export default function HomeLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className="home flow-root bg-(--background) text-(--foreground-secondary)"
    >
      <div
        className="m-4 sm:m-0 sm:mx-auto sm:mt-20 sm:min-h-[calc(100dvh-5rem)]
          sm:w-138"
      >
        <div className="flex min-h-dvh flex-col">
          <TopMenu />
          <div className="flex flex-1 flex-col">{children}</div>
        </div>
        <Footer />
      </div>
    </div>
  );
}
