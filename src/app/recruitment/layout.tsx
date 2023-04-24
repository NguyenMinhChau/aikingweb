export const metadata = {
	title: `Tuyển dụng • ${process.env.NEXT_PUBLIC_TITLE_APP}`,
};
export default function RecruitmentLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return <section>{children}</section>;
}
