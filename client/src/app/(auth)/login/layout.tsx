export default function loginLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main>
      <div>login layout</div>
      {children}
    </main>
  );
}
