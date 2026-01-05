export default function AppsAccessSection() {
  return (
    <section className="bg-[#f9f8f4] py-32">
      <div className="max-w-3xl mx-auto px-6 text-center space-y-16">
        {/* Mobile Apps */}
        <div className="space-y-6">
          <h3 className="text-sm font-bold uppercase tracking-wider text-gray-800">
            Mobile apps
          </h3>

          <div className="flex justify-center gap-4 flex-wrap">
            <img
              src="/badges/app-store.svg"
              alt="Download on the App Store"
              className="h-10 w-32"
            />
            <img
              src="/badges/google-play.svg"
              alt="Get it on Google Play"
              className="h-10 w-32"
            />
          </div>

          <p className="text-sm text-gray-600">
            or{" "}
            <a
              href="#"
              className="text-[#b33556] font-semibold hover:underline"
            >
              download the Android app directly
            </a>
          </p>
        </div>

        {/* Web App */}
        <div className="space-y-6">
          <h3 className="text-sm font-bold uppercase tracking-wider text-gray-800">
            Web app
          </h3>

          <div className="flex justify-center gap-4 flex-wrap">
            <button className="flex items-center gap-2 px-6 py-3 rounded-full bg-black text-white text-sm font-semibold">
              <span></span>
              Log in with Apple
            </button>

            <button className="flex items-center gap-2 px-6 py-3 rounded-full bg-white border border-gray-300 text-sm font-semibold shadow-sm">
              <img src="/icons/google.svg" alt="" className="h-4" />
              Log in with Google
            </button>

            <button className="flex items-center gap-2 px-6 py-3 rounded-full bg-[#1877f2] text-white text-sm font-semibold">
              <img src="/icons/facebook.svg" alt="" className="h-4" />
              Log in with Facebook
            </button>
          </div>

          <p className="text-sm text-gray-600">
            or{" "}
            <a
              href="#"
              className="text-[#b33556] font-semibold hover:underline"
            >
              Sign up with email
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
