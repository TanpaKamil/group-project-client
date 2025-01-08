export default function Footer() {
  return (
    <>
      <footer className="bottom-0 relative footer footer-center text-base-100 h-[78px] z-50 bg-[#6A994E]">
        <aside>
          <p style={{color:"F5EFE6"}}>
            Copyright © {new Date().getFullYear()} - All right reserved by ACME
            Industries Ltd
          </p>
        </aside>
      </footer>
    </>
  );
}
