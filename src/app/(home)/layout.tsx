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
      {/* <div className="m-4 min-h-dvh sm:m-0 sm:mx-auto sm:w-138"> */}
      <div
        className="m-4 flex min-h-dvh flex-col sm:m-0 sm:mx-auto sm:mt-20
          sm:min-h-[calc(100dvh-5rem)] sm:w-138"
      >
        <TopMenu />
        <div className="flex flex-1 flex-col">{children}</div>
        <Footer />
      </div>
    </div>
  );
}
