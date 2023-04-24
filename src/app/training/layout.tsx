export const metadata = {
	title: `Đào tạo • ${process.env.NEXT_PUBLIC_TITLE_APP}`,
};
export default function TrainningLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return <section>{children}</section>;
}
