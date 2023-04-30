export const metadata = {
  title: `Liên hệ • ${process.env.NEXT_PUBLIC_TITLE_APP}`,
};
export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <section>{children}</section>;
}
