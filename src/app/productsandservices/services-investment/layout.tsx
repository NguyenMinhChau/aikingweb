export const metadata = {
	title: `Dịch vụ tư vấn đầu tư • ${process.env.NEXT_PUBLIC_TITLE_APP}`,
};
export default function ServicesInvestmentLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return <section>{children}</section>;
}
