export const metadata = {
	title: `Quản lý quỹ • ${process.env.NEXT_PUBLIC_TITLE_APP}`,
};
export default function ManagerFundLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return <section>{children}</section>;
}
