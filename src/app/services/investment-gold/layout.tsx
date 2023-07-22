export const metadata = {
	title: `Ủy thác đầu tư vàng • ${process.env.NEXT_PUBLIC_TITLE_APP}`,
};
export default function InvestmentGoldLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return <section>{children}</section>;
}
