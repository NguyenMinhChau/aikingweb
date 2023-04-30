export const metadata = {
  title: `Báo cáo tài chính • ${process.env.NEXT_PUBLIC_TITLE_APP}`,
};
export default function FinanceReportLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <section>{children}</section>;
}
