import Footer from "./Footer";
import Navbar from "./Navbar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <main className="max-w-screen-sm mx-auto px-4 py-8">{children}</main>
      <Footer />
    </>
  );
}
