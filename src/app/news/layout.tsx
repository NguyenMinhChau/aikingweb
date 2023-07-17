export const metadata = {
	title: `Tin tức • ${process.env.NEXT_PUBLIC_TITLE_APP}`,
};
export default function NewsLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return <section>{children}</section>;
}
