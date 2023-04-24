export const metadata = {
	title: `Verify OTP • ${process.env.NEXT_PUBLIC_TITLE_APP}`,
};
export default function VerifyLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return <section>{children}</section>;
}
