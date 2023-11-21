import { title } from "@/components/primitives";
import { FaHandsHelping } from "react-icons/fa";
import { TabBar } from "@/components/tabs";
import axios from "axios";
import { Suspense } from "react";
import { auth, currentUser } from "@clerk/nextjs";

async function getData() {
  const appUrl = process.env.NEXT_PUBLIC_APP_URL;
  const res = await axios.get(`${appUrl}/api/campaigns`);
  const data = await res.data;
  return data;
}

export default async function Home() {
  const data = await getData();
  return (
    <>
      <section>
        <div className="px-4 py-12 mx-auto max-w-7xl sm:px-6 md:px-12 lg:px-24 lg:py-24">
          <div className="flex flex-col w-full mb-12 text-center">
            <div className="inline-flex items-center justify-center flex-shrink-0 w-20 h-20 mx-auto mb-5 text-secondary rounded-full dark:bg-gray-900 bg-slate-200">
              <FaHandsHelping size={40} />
            </div>
            <h1 className="max-w-5xl text-2xl font-bold leading-none tracking-tighter  md:text-5xl lg:text-6xl lg:max-w-7xl">
              <span className={title({ color: "violet" })}>
                Make an impact{" "}
              </span>{" "}
              <br></br>
              no matter where you are
            </h1>

            <p className="max-w-xl mx-auto mt-8 text-base leading-relaxed text-center text-gray-500">
              Our mission is to bring people together from all walks of life to
              support those in need and create positive change in our
              communities.{" "}
            </p>

            <a
              className="mx-auto mt-8 text-sm font-semibold text-blue-600 hover:text-neutral-600"
              title="read more"
            >
              {" "}
              Read more about the Project »{" "}
            </a>
          </div>
        </div>
      </section>
      <section>
        <div className="2xl:max-w-7xl sm:px-6 md:px-12 lg:px-24 lg:py-24 2xl:px-12 px-4 py-12 mx-auto">
          <div className="2xl:max-w-7xl flex flex-wrap items-center mx-auto">
            <div className="lg:flex-grow lg:w-1/2 lg:pr-24 md:mb-0 flex flex-col items-start mb-16 text-left">
              <span className="mb-8 text-xs font-bold tracking-widest text-blue-600 uppercase underline underline-offset-8 ">
                {" "}
                Explore{" "}
              </span>
              <h1 className=" md:text-7xl lg:text-5xl mb-8 text-4xl font-bold leading-none tracking-tighter">
                Today&apos;s Campaigns.
              </h1>
              <p className="mb-8 text-base leading-relaxed text-left text-gray-500">
                Fundraising campaigns change lives and unite commmunities around
                the world.Your gift to help those in need will helps us provide
                assistance to people who need it most in a meaningful and
                tangable way.<br></br>
              </p>
            </div>
          </div>
        </div>
      </section>
      <Suspense fallback={<p>Loading feed...</p>}>
        <TabBar campaigns={data} />
      </Suspense>
    </>
  );
}
