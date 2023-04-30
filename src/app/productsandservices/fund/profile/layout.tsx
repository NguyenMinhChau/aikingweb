export const metadata = {
  title: `Tài khoản • ${process.env.NEXT_PUBLIC_TITLE_APP}`,
};
export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <section>{children}</section>;
}
