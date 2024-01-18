import React from 'react';

function JobPage() {
  return (
    < div className=" mx-0  w-full ">
      <header className="flex items-center justify-between py-4 bg-white border-t-2 border-gray-300 ">
        <a href="/" className=" pl-6 text-black font-bold text-2xl">LOGO</a>
        <nav className="flex space-x-4 text-black text-lg ">
          <a href="#" className=" font-medium hover:underline hover:text-green-800 ">Community</a>
          <a href="#" className=" font-medium hover:underline hover:text-green-800 ">Jobs</a>
          <a href="#" className=" font-medium hover:underline hover:text-green-800 ">Companies</a>
          <a href="#" className=" font-medium hover:underline hover:text-green-800 ">Salaries</a>
          <a href="#" className=" font-medium hover:underline hover:text-green-800 ">Rising Stars</a>
          <div className="relative">
            <input
              type="text"
              placeholder="Search"
              className="w-30 bg-gray-900 text-white rounded-lg pl-8 pr-8 py-2 focus:outline-none focus:ring-2 focus:ring-white"
            />
            <button className="absolute right-0 top-0 mt-3 mr-4">
              <svg
                className="w-5 h-5 text-white"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
        </nav>
      </header>
      <div>
        <hr className=" border-t-2 border-gray-300" />
      </div>
      <div className="flex justify-center items-center h-full">
  <div className="w-1/4 pt-8 pl-10 pr-10 pd-8">
    <input
      type="text"
      className="bg-gray-20 border border-gray-50 w-full text-gray-200 sm:text-sm rounded-3xl focus:ring-primary-50 focus:border-primary-200 block p-2.5 dark:bg-gray-100 dark:border-gray-400 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      placeholder="Do What Suits You, That Defines You Who You Are!!"
      required=""
    />
  </div>
</div>



      <main className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <aside className="bg-gray-100 p-4">
          {/* Sidebar content goes here */}
        </aside>
        <section className="p-4">
          {/* Main content sections go here */}
        </section>
      </main>
    </div>
  );
}

export default JobPage;


