export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-500 flex justify-center items-center">
      {children}
    </div>
  );
}
