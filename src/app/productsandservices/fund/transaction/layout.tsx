export const metadata = {
  title: `Giao dịch • ${process.env.NEXT_PUBLIC_TITLE_APP}`,
};
export default function TransactionLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <section>{children}</section>;
}
