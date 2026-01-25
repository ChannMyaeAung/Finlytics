export default function AppsAccessSection() {
  return (
    <section className="bg-[#f9f8f4] py-16">
      <div className="max-w-3xl mx-auto px-6 text-center space-y-8">
        {/* Mobile Apps */}
        <div className="">
          <h3 className="text-lg font-medium tracking-wider text-gray-800 pb-12">
            Mobile apps
          </h3>
          <div className="flex items-center flex-col justify-center gap-4 flex-wrap">
            <div className="bg-black px-3 py-1.5 rounded-sm w-[80%]">
              <a href="#" className="flex items-center justify-center w-full">
                <img
                  src="/badges/apple.png"
                  alt="Download on the App Store"
                  className="h-5 mr-1"
                />

                <div className="flex items-start flex-col">
                  <span className="text-white text-[10px]">
                    Download on the
                  </span>
                  <img
                    src="/badges/apple-label.png"
                    alt="App Store Label"
                    className="h-4"
                  />
                </div>
              </a>
            </div>

            <div className="bg-black px-3 py-1.5 rounded-sm w-[80%]">
              <a href="#" className="flex items-center justify-center w-full">
                <img
                  src="/badges/playstore.png"
                  alt="Download on the App Store"
                  className="h-5 mr-1"
                />

                <div className="flex items-start flex-col">
                  <span className="text-white text-left uppercase text-[10px]">
                    Get it on
                  </span>
                  <img
                    src="/badges/playstore-label.png"
                    alt="Play Store Label"
                    className="h-4"
                  />
                </div>
              </a>
            </div>
          </div>

          <p className="text-sm text-gray-600 my-4">
            or{" "}
            <a
              href="#"
              className="text-[#b33556] text-sm md:text-lg font-normal hover:underline"
            >
              download the Android app directly
            </a>
          </p>
        </div>

        {/* Web App */}
        <div className="space-y-6">
          <h3 className="text-sm font-bold tracking-wider text-gray-800">
            Web app
          </h3>

          <div className="flex justify-center gap-4 flex-wrap">
            <button className="flex items-center gap-2 px-6 py-3 rounded-full bg-black text-white text-sm font-semibold shadow-2xl w-full justify-center">
              <img src="/badges/apple.png" alt="apple logo" className="h-4" />
              Log in with Apple
            </button>

            <button className="flex items-center gap-2 px-6 py-3 rounded-full bg-white border border-gray-300 text-sm font-semibold shadow-lg w-full justify-center">
              <img src="/badges/google.png" alt="google logo" className="h-4" />
              Log in with Google
            </button>

            <button className="flex items-center gap-2 px-6 py-3 rounded-full bg-[#007aff] text-white text-sm font-semibold shadow-lg w-full justify-center">
              <img
                src="/badges/facebook.png"
                alt="facebook logo"
                className="h-4"
              />
              Log in with Facebook
            </button>
          </div>

          <p className="text-lg text-gray-600">
            or{" "}
            <a
              href="#"
              className="text-[#b33556] text-sm font-normal hover:underline"
            >
              Sign up with email
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
