export const metadata = {
	title: `Dịch vụ cung cấp phần mềm • ${process.env.NEXT_PUBLIC_TITLE_APP}`,
};
export default function ServicesLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return <section>{children}</section>;
}
