export default function Hero() {
  return (
    <section className="bg-[#f9f9f3] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-16">
          {/* LEFT CONTENT */}
          <div className="items-center flex flex-col text-center">
            <h1 className="text-[5rem] font-sans font-extrabold leading-[1em] text-gray-900">
              <em>Track all your cards and cash</em>
              <br />
              <i>in one place.</i>
            </h1>

            <p className="mt-6 max-w-md text-gray-600">
              Connect your financial accounts, or enter expenses using our quick
              and slick <strong>Toshl apps</strong>. Toshl helps you with the
              financial means. So you can <strong>focus on the goals.</strong>
            </p>

            <button className="mt-10 px-10 py-4 rounded-full bg-[#006555] text-white font-semibold hover:bg-emerald-800 transition">
              START FREE TRIAL
            </button>
          </div>

          {/* RIGHT DEVICES */}
          <div className="relative h-[520px] hidden lg:block">
            {/* iPad */}
            <img
              src="ipad.png"
              alt="iPad dashboard"
              className="
                absolute
                top-20
                w-[80vw]
                max-w-224.75
                min-w-[449.5px]
                rotate-x-0
                rotate-y-0
                rotate-z-0
                scale-3d
                -mt-24
                left-[4vw]
                z-10
                drop-shadow-2xl
              "
            />

            {/* iPhone */}
            <img
              src="phone.png"
              alt="iPhone app"
              className="
                absolute
                top-[-11%]
                left-68
                w-[50vw]
                rotate-x-0
                rotate-y-0
                rotate-z-0
                scale-3d
                z-20
                drop-shadow-2xl
              "
            />
          </div>
        </div>
      </div>
    </section>
  );
}
