import { Link } from "react-router-dom";
import { motion, useMotionValue, useTransform } from "framer-motion";
import Navbar from "../components/UI/Navbar";
import Footer from "../components/UI/Footer";
import heroImage from "../assets/hero.png";

export default function Landing() {
  return (
    <div className="flex flex-col min-h-screen bg-[#E3E4DB]">
      <Navbar />

      <main className="flex-1 max-w-[1440px] mx-auto px-6 pt-28 relative overflow-hidden">
        {/* ================= HERO SECTION ================= */}
        <section className="relative flex flex-col md:flex-row items-center justify-between 
          bg-gradient-to-br from-[#E3E4DB] via-[#F5F3F8] to-[#E3E4DB]
          rounded-b-[80px] p-8 shadow-lg overflow-hidden">

          {/* Decorative Circles */}
          <div className="absolute -top-16 -left-12 w-52 h-52 bg-[#58B09C]/25 rounded-full blur-2xl pointer-events-none"></div>
          <div className="absolute -top-10 right-12 w-32 h-32 bg-[#531CB3]/25 rounded-full blur-2xl pointer-events-none"></div>
          <div className="absolute -bottom-16 -right-10 w-40 h-40 bg-[#9F838C]/25 rounded-full blur-3xl pointer-events-none"></div>

          {/* HERO TEXT */}
          <div className="z-10 md:w-1/2 text-center md:text-left">
            <h1 className="text-5xl md:text-6xl font-extrabold mb-4 text-[#56351E] leading-tight drop-shadow-sm">
              🎟️ TicketApp
            </h1>
            <p className="mb-8 text-[#9F838C] text-lg md:text-xl font-medium max-w-md mx-auto md:mx-0">
              Manage your tickets seamlessly — Create, Edit, and Resolve all in one place.
            </p>

            <div className="relative flex flex-col sm:flex-row justify-center md:justify-start space-y-3 sm:space-y-0 sm:space-x-4">
              <Link
                to="/auth/login"
                className="relative bg-[#531CB3] text-white px-6 py-3 rounded-lg hover:bg-[#58B09C] transition duration-300 shadow-md font-medium z-10"
              >
                Login
              </Link>
              <Link
                to="/auth/signup"
                className="relative border border-[#531CB3] text-[#531CB3] bg-white px-6 py-3 rounded-lg hover:bg-[#531CB3] hover:text-white transition duration-300 shadow-sm font-medium z-10"
              >
                Get Started
              </Link>
            </div>
          </div>

          {/* HERO CARD AREA */}
          <div className="z-10 md:w-1/2 mt-10 md:mt-0 flex justify-center relative">
            {/* Glowing animated circle behind card */}
            <div className="absolute inset-0 flex justify-center items-center pointer-events-none">
              <div className="w-52 h-52 bg-[#531CB3]/20 rounded-full blur-3xl animate-pulse"></div>
            </div>

            {/* The 3D Tilt Hero Card */}
            <HeroCardWithTilt imageSrc={heroImage} />
          </div>

          {/* WAVE SVG BACKGROUND */}
          <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none pointer-events-none">
            <svg
              className="w-full h-[120px]"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 1600 120"
              preserveAspectRatio="none"
            >
              <path
                d="M0,60 C500,140 1100,-20 1600,100 L1600,120 L0,120 Z"
                fill="#58B09C"
                opacity="0.9"
              ></path>
            </svg>
          </div>
        </section>

        {/* ================= FEATURE CARDS ================= */}
        <section className="mt-20 grid md:grid-cols-3 gap-8">
          <FeatureCard
            title="Create Tickets"
            color="#531CB3"
            text="Log new tickets and track them effortlessly in real-time."
          />
          <FeatureCard
            title="Manage Tickets"
            color="#58B09C"
            text="Update, resolve, and organize tickets efficiently."
          />
          <FeatureCard
            title="Analyze Stats"
            color="#9F838C"
            text="Visualize open, closed, and total ticket metrics at a glance."
          />
        </section>
      </main>

      <Footer />
    </div>
  );
}

/* --------------------------------------------
   HERO CARD WITH 3D TILT + FLOATING ANIMATION
--------------------------------------------- */
function HeroCardWithTilt({ imageSrc }) {
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);

  const rotateY = useTransform(mx, (v) => (v - 0.5) * 18);
  const rotateX = useTransform(my, (v) => (0.5 - v) * 14);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const nx = (e.clientX - rect.left) / rect.width;
    const ny = (e.clientY - rect.top) / rect.height;
    mx.set(nx);
    my.set(ny);
  };

  const handleMouseLeave = () => {
    mx.set(0.5);
    my.set(0.5);
  };

  return (
    <div style={{ perspective: 1000 }} className="relative">
      <motion.div
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        whileHover={{ scale: 1.03 }}
        style={{ rotateX, rotateY }}
        className="w-[250px] md:w-[320px] h-[200px] bg-gradient-to-br from-[#F3F0FF] to-[#E8E6F0]
          shadow-xl rounded-2xl flex items-center justify-center overflow-hidden border border-[#9F838C]/20 relative z-10"
      >
        {/* Small decorative circle inside card */}
        <div className="absolute -top-4 left-8 w-8 h-8 bg-[#58B09C]/50 rounded-full blur-sm pointer-events-none"></div>

        {/* Inner gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-tr from-white/40 to-transparent pointer-events-none"></div>

        <img
          src={imageSrc}
          alt="TicketApp dashboard preview"
          className="object-contain w-full h-full p-4 relative z-30"
          draggable="false"
        />
      </motion.div>
    </div>
  );
}

/* --------------------------------------------
   FEATURE CARD COMPONENT
--------------------------------------------- */
function FeatureCard({ title, text, color }) {
  return (
    <div
      className="bg-white border border-[#56351E]/10 p-6 shadow-sm rounded-xl hover:shadow-md transition duration-300"
    >
      <h3 className="font-bold mb-2 text-lg" style={{ color }}>
        {title}
      </h3>
      <p className="text-gray-600">{text}</p>
    </div>
  );
}
