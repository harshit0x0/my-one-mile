import Header from "./components/header";
import Link from "next/link";
import { getUser } from "./actions";

export default async function Home() {
  const user = await getUser();
  return (
    <div className={`bg-background min-h-screen min-w-80 py-0`}>
      <Header user={user} />
      <main className="flex flex-col justify-center items-center h-full bg-background">

        {/* <!-- Hero Section --> */}
        <section className="bg-gradient-to-r from-[#F4F4F2] to-primary px-4 w-full py-24 text-center text-[#2D2D2D]">
          <h1 className="text-3xl lg:text-5xl font-bold mb-4">Change Starts Here
            <div className="my-5 relative h-32" >
              <div className="mx-auto relative w-32 h-32">
                <span className="absolute right-0 hover:border-primary hover:border-8 hover:shadow-inner hover:shadow-2xl z-1 w-32 h-32 rounded-full hover:scale-125 duration-300 ease-in-out"></span>
                <div className="mx-auto py-11 md:py-9 my-auto py-auto p-0"><span className="my-auto">One</span></div>
              </div>
            </div>
            Mile at a Time</h1>
          <p className="lg:text-xl mb-8">Join a community-driven movement to make an impact in every neighborhood, every mile.</p>
          <div className="flex justify-center gap-4 transition">
            <a href="/signup" className="bg-primary-light text-white px-6 py-3 rounded-md shadow-xl transform hover:bg-background hover:text-text hover:scale-105 duration-300 ease-in-out">Get Started</a>
            <a href="/posts" className="bg-secondary-light text-white px-6 py-3 rounded-md shadow-xl transform hover:bg-background hover:text-text hover:scale-105 duration-300 ease-in-out">Browse Posts</a>
          </div>
        </section>

        {/* <!-- Key Features Section --> */}
        <section className="py-16">
          <div className="container mx-auto text-center">
            <h2 className="text-2xl md:text-4xl text-text font-semibold mb-8">
              What My One Mile Offers
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

              {/* Feature Card */}
              <div className="p-8 bg-secondary md:rounded-lg shadow-2xl transition-transform transform   hover:bg-text hover:-rotate-1 hover:scale-110 duration-300 ease-in-out group">
                <h3 className="text-2xl text-background font-semibold mb-4 transition-colors duration-300 ">
                  Community-Driven Activities
                </h3>
                <p className="text-gray-300">
                  Engage in local projects, from appreciation posts to reporting issues.
                </p>
              </div>

              {/* Feature Card */}
              <div className="p-8 bg-text md:rounded-lg shadow-2xl transition-transform transform hover:bg-secondary hover:rotate-1 hover:scale-110 duration-300 ease-in-out group">
                <h3 className="text-2xl text-background font-semibold mb-4 transition-colors duration-300 ">
                  Location-Based Alerts
                </h3>
                <p className="text-gray-300">
                  Stay informed on activities and changes around you.
                </p>
              </div>

              {/* Feature Card */}
              <div className="p-8 bg-secondary md:rounded-lg shadow-2xl transition-transform transform hover:bg-text hover:-rotate-1 hover:scale-110 duration-300 ease-in-out group">
                <h3 className="text-2xl text-background font-semibold mb-4 transition-colors duration-300 ">
                  Real-Time Interaction
                </h3>
                <p className="text-gray-300">
                  Post comments, share updates, and interact with others.
                </p>
              </div>

            </div>
          </div>
        </section>

        {/* <!-- Testimonials Section --> */}
        <section className="bg-background-light py-16">
          <div className="container mx-auto text-center">
            <h2 className="text-2xl md:text-4xl text-text font-semibold mb-8">See what our community has to say</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="p-6 bg-primary shadow-2xl rounded-md transform hover:scale-105 transition-transform duration-200">
                <p>"My One Mile has helped me connect with my neighbors and make a real impact in my community!"</p>
                <p className="mt-4 text-sm text-secondary-dark">- Alex, Community Member</p>
              </div>
              <div className="p-6 bg-primary shadow-2xl rounded-md transform hover:scale-105 transition-transform duration-200">
                <p>"Being able to share updates and alerts is invaluable. This app has truly brought us together."</p>
                <p className="mt-4 text-sm text-secondary-dark">- Jamie, Volunteer</p>
              </div>
              <div className="p-6 bg-primary shadow-2xl rounded-md transform hover:scale-105 transition-transform duration-200">
                <p>"A powerful tool to create and support meaningful change, one small step at a time."</p>
                <p className="mt-4 text-sm text-secondary-dark">- Taylor, Resident</p>
              </div>
            </div>
          </div>
        </section>

        {/* <!-- How It Works Section --> */}
        <section className="py-16">
          <div className="container mx-auto text-center">
            <h2 className="text-4xl font-semibold mb-8">How It Works</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="p-6 bg-white shadow-lg rounded-md transform transition-transform">
                <h3 className="text-2xl font-medium mb-4">1. Sign Up & Set Location</h3>
                <p>Customize your experience by selecting your community.</p>
              </div>
              <div className="p-6 bg-white shadow-lg rounded-md transform transition-transform">
                <h3 className="text-2xl font-medium mb-4">2. Create or Join Activities</h3>
                <p>Start an initiative or participate in local projects.</p>
              </div>
              <div className="p-6 bg-white shadow-lg rounded-md transform transition-transform">
                <h3 className="text-2xl font-medium mb-4">3. Engage & Share</h3>
                <p>Connect with others by posting updates and comments.</p>
              </div>
            </div>
          </div>
        </section>

        {/* <!-- Call to Action Banner --> */}
        <section className="bg-primary px-10 py-16 text-center text-white shadow-2xl shadow-sm shadow-primary">
          <h2 className="text-2xl md:text-4xl font-semibold mb-6">Ready to make a difference in your community?</h2>
          <a href="/signup" className="bg-text mt-5 text-background px-8 py-3 rounded-md hover:scale-105 hover:bg-background hover:text-text transition-colors duration-300 ease-in-out">Get Started Now</a>
        </section>

        {/* <!-- Footer Section --> */}
        <footer className="bg-[#2A2A2A] w-full mt-24 text-white py-8">
          <div className="container mx-auto text-center">
            <div className="flex justify-center space-x-4 mb-4">
              <a href="#" className="hover:text-secondary-light">About</a>
              <a href="#" className="hover:text-secondary-light">FAQ</a>
              <a href="#" className="hover:text-secondary-light">Contact</a>
              <a href="#" className="hover:text-secondary-light">Blog</a>
            </div>
            <p>© 2024 My One Mile. All rights reserved.</p>
          </div>
        </footer>
      </main>
    </div>
  );

}
