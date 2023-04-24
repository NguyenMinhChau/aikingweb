export const metadata = {
	title: `Nạp tiền • ${process.env.NEXT_PUBLIC_TITLE_APP}`,
};
export default function DepositsLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return <section>{children}</section>;
}
