export const metadata = {
  title: `Lịch sử • ${process.env.NEXT_PUBLIC_TITLE_APP}`,
}
export default function HistoryLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <section>{children}</section>
}
