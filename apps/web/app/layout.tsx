export interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <html>
      <head></head>
      <body>{children}</body>
    </html>
  );
}
