

export default function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col min-h-full">
      <main className="flex-1 mx-auto px-4 py-8">
        {children}
      </main>
    </div>
  );
}


