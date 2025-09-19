import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

// ✅ Typing effect hook with continuous loop
function useTypingEffect(text, speed = 100, pause = 1500) {
  const [displayedText, setDisplayedText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const handleTyping = () => {
      if (!isDeleting) {
        if (index < text.length) {
          setDisplayedText(text.slice(0, index + 1));
          setIndex(prev => prev + 1);
        } else {
          setTimeout(() => setIsDeleting(true), pause);
        }
      } else {
        if (index > 0) {
          setDisplayedText(text.slice(0, index - 1));
          setIndex(prev => prev - 1);
        } else {
          setIsDeleting(false);
        }
      }
    };

    const interval = setInterval(handleTyping, speed);
    return () => clearInterval(interval);
  }, [text, speed, pause, index, isDeleting]);

  return displayedText;
}

const services = [
  { title: "Plumbing", description: "Expert plumbing solutions for leaks, pipes, and installations.", link: "/plumbing" },
  { title: "Cleaning", description: "Professional cleaning services for a spotless home.", link: "/cleaning" },
  { title: "Electrical", description: "Trusted electricians for repairs, wiring, and fittings.", link: "/electrical" },
  { title: "Carpentry", description: "Custom carpentry, furniture repair, and woodwork services.", link: "/carpentry" },
  { title: "Painting", description: "Brighten your home with professional painting services.", link: "/painting" },
];

const bgImages = [
  "/house-cleaning-pictures-xdntho6b8ri7ufnu.jpg",
  "/GettyImages-1147804793.jpg",
  "/02-13-things-plumber.jpg",
  "/eletrician.jpg",
  "/maxresdefault.jpg",
];

function Home() {
  const heading = "Step Into a Smarter World of Home Services";
  const typedHeading = useTypingEffect(heading, 70, 2000);

  const [hovered, setHovered] = useState(null);
  const [currentBg, setCurrentBg] = useState(0);
  const [showLoginDropdown, setShowLoginDropdown] = useState(false);
  const [showSignUpDropdown, setShowSignUpDropdown] = useState(false);
  const [showRecordsDropdown, setShowRecordsDropdown] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const [showTopBtn, setShowTopBtn] = useState(false);
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  // Background slideshow
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBg(prev => (prev + 1) % bgImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = e => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowLoginDropdown(false);
        setShowSignUpDropdown(false);
        setShowRecordsDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Back-to-top button
  useEffect(() => {
    const handleScroll = () => setShowTopBtn(window.scrollY > 300);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  // Navigation functions
  const goToSignUp = () => navigate("/signup");
  const goToLogin = () => navigate("/login");
  const goToWorkerLogin = () => navigate("/workerlogin");
  const goToWorkerRegister = () => navigate("/workerregister");
  const goToAdminSignup = () => navigate("/adminsignup");
  const goToAdminLogin = () => navigate("/adminlogin");
  const goToDashboard = () => {
    const token = localStorage.getItem("authToken");
    if (token) {
      navigate("/customer/dashboard");
    } else {
      navigate("/login", { state: { from: "/customer/dashboard" } });
    }
  };

  const handleBookNow = serviceLink => {
    const token = localStorage.getItem("authToken");
    if (!token) navigate("/login", { state: { from: serviceLink } });
    else navigate(serviceLink);
  };

  return (
    <div className="min-h-screen text-white overflow-hidden relative bg-black">
      {/* Background slideshow */}
      <AnimatePresence>
        {bgImages.map((img, index) =>
          index === currentBg && (
            <motion.div
              key={img}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.2 }}
              className="absolute inset-0 w-full h-full bg-cover bg-center"
              style={{ backgroundImage: `url(${img})` }}
            />
          )
        )}
      </AnimatePresence>

      <div className="absolute inset-0 bg-black/70"></div>

      {/* Top Bar with Logo */}
      <div ref={dropdownRef} className="absolute top-0 left-0 w-full flex justify-between items-center px-8 py-4 z-30">
        <div className="flex items-center gap-3">
          {/* ✅ Logo image */}
          <img src="/image.png" alt="Logo" className="w-10 h-10 rounded-full object-cover" />
          <h1 className="text-2xl font-bold tracking-wide">Shared Services</h1>
        </div>

        <div className="flex gap-3 relative items-center">
          {/* Sign Up */}
          <div className="relative">
            <button
              className="px-4 py-2 rounded-xl border border-gray-400 hover:bg-gray-700 transition bg-transparent"
              onClick={() => { setShowSignUpDropdown(prev => !prev); setShowLoginDropdown(false); setShowRecordsDropdown(false); }}
            >
              Sign Up
            </button>
            <AnimatePresence>
              {showSignUpDropdown && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="absolute right-0 mt-2 w-52 bg-neutral-900 text-gray-200 rounded-xl shadow-lg border border-gray-700 z-50"
                >
                  <button className="block w-full text-left px-4 py-2 hover:bg-neutral-800 rounded-t-xl" onClick={goToWorkerRegister}>Sign Up as Worker</button>
                  <button className="block w-full text-left px-4 py-2 hover:bg-neutral-800" onClick={goToSignUp}>Sign Up as Customer</button>
                  <button className="block w-full text-left px-4 py-2 hover:bg-neutral-800 rounded-b-xl" onClick={goToAdminSignup}>Sign Up as Admin</button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Login */}
          <div className="relative">
            <button
              className="px-4 py-2 rounded-xl border border-gray-400 hover:bg-gray-700 transition bg-transparent"
              onClick={() => { setShowLoginDropdown(prev => !prev); setShowSignUpDropdown(false); setShowRecordsDropdown(false); }}
            >
              Login
            </button>
            <AnimatePresence>
              {showLoginDropdown && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="absolute right-0 mt-2 w-52 bg-neutral-900 text-gray-200 rounded-xl shadow-lg border border-gray-700 z-50"
                >
                  <button className="block w-full text-left px-4 py-2 hover:bg-neutral-800 rounded-t-xl" onClick={goToWorkerLogin}>Login as Worker</button>
                  <button className="block w-full text-left px-4 py-2 hover:bg-neutral-800" onClick={goToLogin}>Login as Customer</button>
                  <button className="block w-full text-left px-4 py-2 hover:bg-neutral-800 rounded-b-xl" onClick={goToAdminLogin}>Login as Admin</button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* View My Records */}
          <div className="relative">
            <button
              className="px-4 py-2 rounded-xl border border-gray-400 hover:bg-gray-700 transition bg-transparent font-semibold"
              onClick={() => { setShowRecordsDropdown(prev => !prev); setShowLoginDropdown(false); setShowSignUpDropdown(false); }}
            >
              View My Records
            </button>
            <AnimatePresence>
              {showRecordsDropdown && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="absolute right-0 mt-2 w-48 bg-neutral-900 text-gray-200 rounded-xl shadow-lg border border-gray-700 z-50"
                >
                  <button 
                    className="block w-full text-left px-4 py-2 hover:bg-neutral-800 rounded-t-xl"
                    onClick={goToDashboard}
                  >
                    Go to Dashboard
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="relative z-20 text-center flex flex-col items-center justify-center h-[80vh] px-6">
        <motion.h2
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-5xl font-extrabold bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent mb-4"
        >
          {typedHeading}
          <span className="animate-pulse">|</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 1 }}
          className="text-lg text-gray-300 mb-8 max-w-2xl"
        >
          Book trusted professionals for plumbing, cleaning, electrical work, and more.
        </motion.p>
        <motion.button
          whileHover={{ scale: 1.05 }}
          onClick={() => document.getElementById("services")?.scrollIntoView({ behavior: "smooth" })}
          className="text-indigo-400 hover:text-cyan-400 font-bold underline underline-offset-4"
        >
          OUR SERVICES ↓
        </motion.button>
      </div>

      {/* Services Section */}
      {/* Services Section */}
{/* Services Section */}
{/* Services Section */}
<section id="services" className="relative py-20 px-6">
  <div className="flex flex-col lg:flex-row items-start gap-10">
    {/* Left Panel */}
    <div className="lg:w-1/3 w-full mb-8 lg:mb-0">
      <AnimatePresence>
        {selectedService ? (
          <motion.div
            key={selectedService.title}
            initial={{ opacity: 0, x: -50, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: -50, scale: 0.9 }}
            transition={{ duration: 0.5 }}
            className="p-6 rounded-2xl bg-neutral-900/90 border border-gray-700 shadow-lg"
          >
            <h3 className="text-2xl font-bold mb-3">{selectedService.title}</h3>
            <p className="text-gray-300 mb-4">{selectedService.description}</p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              className="bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-xl font-semibold"
              onClick={() => handleBookNow(selectedService.link)}
            >
              Book Now
            </motion.button>
          </motion.div>
        ) : (
          <p className="text-gray-400 text-lg">Click on a service card to see details here.</p>
        )}
      </AnimatePresence>
    </div>

    {/* Right Panel */}
    <div className="relative flex-1 min-h-[500px]">
      {services.map((service, index) => (
        <motion.div
          key={service.title}
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: index * 0.15 }}
          whileHover={{
            scale: 1.08,
            y: -10,
            rotateX: 5,
            rotateY: 5,
            boxShadow: "0 20px 30px rgba(0,0,0,0.5)",
            zIndex: 20
          }}
          onHoverStart={() => setHovered(index)}
          onHoverEnd={() => setHovered(null)}
          onClick={() => setSelectedService(service)}
          className={`absolute top-0 left-0 w-[300px] h-[480px] rounded-2xl overflow-hidden bg-neutral-900/90 backdrop-blur-lg border border-gray-700 cursor-pointer flex items-center justify-center ${hovered === index ? "z-20" : "z-10"}`}
          style={{ left: `${index * 40}px` }}
        >
          <div className="flex flex-col items-center justify-center h-full w-full p-6 text-center">
            <h2 className="text-2xl font-bold">{service.title}</h2>
            <motion.button
              whileHover={{ scale: 1.05, y: -5 }}
              className="mt-4 bg-gray-100 text-black px-4 py-2 rounded-xl font-semibold"
            >
              Learn More
            </motion.button>
          </div>
        </motion.div>
      ))}
    </div>
  </div>
</section>



      {/* Back to Top */}
      <AnimatePresence>
        {showTopBtn && (
          <motion.button
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            transition={{ duration: 0.3 }}
            onClick={scrollToTop}
            className="fixed bottom-6 right-6 bg-indigo-600 hover:bg-indigo-700 text-white p-3 rounded-full shadow-lg z-50"
          >
            ↑
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}

export default Home;
