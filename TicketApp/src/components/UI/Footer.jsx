export default function Footer() {
  return (
    <footer className="bg-[#56351E] text-[#E3E4DB] mt-12">
      <div className="max-w-[1440px] mx-auto px-6 py-6 flex flex-col md:flex-row justify-between items-center space-y-3 md:space-y-0">
        {/* Copyright */}
        <p className="text-sm md:text-base">
          © {new Date().getFullYear()} <span className="font-semibold">TicketApp</span>. All rights reserved.
        </p>

        {/* Links */}
        <div className="flex space-x-6 text-sm md:text-base">
          <a
            href="#"
            className="hover:text-[#58B09C] transition-colors duration-200"
          >
            Privacy Policy
          </a>
          <a
            href="#"
            className="hover:text-[#58B09C] transition-colors duration-200"
          >
            Terms of Service
          </a>
        </div>
      </div>
    </footer>
  );
}
