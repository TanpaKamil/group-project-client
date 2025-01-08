export default function Footer() {
  return (
    <>
      <footer className="bottom-0 relative footer footer-center bg-accent text-base-100 h-[78px] z-50">
        <aside>
          <p>
            Copyright © {new Date().getFullYear()} - All right reserved by ACME
            Industries Ltd
          </p>
        </aside>
      </footer>
    </>
  );
}
