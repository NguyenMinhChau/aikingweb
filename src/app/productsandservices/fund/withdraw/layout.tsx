export const metadata = {
  title: `Rút tiền • ${process.env.NEXT_PUBLIC_TITLE_APP}`,
};
export default function WithdrawLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <section>{children}</section>;
}
