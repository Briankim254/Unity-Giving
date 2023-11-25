export default function AdminnLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <section className="container">{children}</section>;
}
