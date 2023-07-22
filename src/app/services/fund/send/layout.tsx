export const metadata = {
	title: `Gửi quỹ • ${process.env.NEXT_PUBLIC_TITLE_APP}`,
};
export default function SendFundLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return <section>{children}</section>;
}
