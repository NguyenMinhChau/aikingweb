export const metadata = {
	title: `Lập trình • ${process.env.NEXT_PUBLIC_TITLE_APP}`,
};
export default function DeveloperLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return <section>{children}</section>;
}
