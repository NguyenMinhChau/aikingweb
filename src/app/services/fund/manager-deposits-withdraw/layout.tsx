export const metadata = {
	title: `Lịch sử nạp rút • ${process.env.NEXT_PUBLIC_TITLE_APP}`,
};
export default function ManagerDepositsWithdrawLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return <section>{children}</section>;
}
