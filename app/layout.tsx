import "./globals.css";
import { Toaster } from "sonner";
import type { Metadata } from "next";
import { ClerkProvider } from '@clerk/nextjs';
import { Space_Grotesk } from "next/font/google";

const spaceGroptesk = Space_Grotesk({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: "TerraLink",
	description: "Manage and administer your links in one place",
};

export default function RootLayout({
  	children,
}: Readonly<{
  	children: React.ReactNode;
}>) {
	return (
		<ClerkProvider>
			<html lang="en" suppressHydrationWarning>
				<body
					className={`${spaceGroptesk.className}`}
				>
					{children}
					<Toaster richColors position="top-right" />
				</body>
			</html>
		</ClerkProvider>
	);
}
