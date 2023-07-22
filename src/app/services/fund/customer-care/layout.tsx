export const metadata = {
	title: `CSKH • ${process.env.NEXT_PUBLIC_TITLE_APP}`,
};
export default function CustomerCareLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return <section>{children}</section>;
}
