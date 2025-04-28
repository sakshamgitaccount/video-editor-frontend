import "./globals.css";
import ReduxProvider from "@/components/ui/ReduxProvider";

export const metadata = {
  title: "Video Editor",
  description: "Browser-based video editing tool",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
      <ReduxProvider>{children}</ReduxProvider>
      </body>
    </html>
  );
}
