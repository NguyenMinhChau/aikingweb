export const metadata = {
	title: `Giới thiệu • ${process.env.NEXT_PUBLIC_TITLE_APP}`,
};
export default function AboutUsLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return <section>{children}</section>;
}
