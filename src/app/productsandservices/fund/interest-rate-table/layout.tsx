export const metadata = {
	title: `Quỹ tham khảo • ${process.env.NEXT_PUBLIC_TITLE_APP}`,
};
export default function InterestRateLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return <section>{children}</section>;
}
