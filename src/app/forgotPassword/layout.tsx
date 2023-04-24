export const metadata = {
	title: `Forgot Password • ${process.env.NEXT_PUBLIC_TITLE_APP}`,
};
export default function ForgotPasswordLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return <section>{children}</section>;
}
