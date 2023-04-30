export const metadata = {
  title: `Quỹ tiết kiệm • ${process.env.NEXT_PUBLIC_TITLE_APP}`,
};
export default function FundLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <section>{children}</section>;
}
