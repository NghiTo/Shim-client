import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa6";

const Footer = () => {
  return (
    <div className="flex flex-col p-8 gap-6">
      <div className="grid grid-cols-4">
        <div className="flex flex-col gap-4">
          <h1 className="font-semibold">Features</h1>
          <p>School & District</p>
          <p>Shim for work</p>
          <p>Create a quiz</p>
          <p>Create a lesson</p>
        </div>
        <div className="flex flex-col gap-4">
          <h1 className="font-semibold">Subjects</h1>
          <p>Mathematics</p>
          <p>Social studies</p>
          <p>Science</p>
          <p>Physics</p>
          <p>Chemistry</p>
          <p>Biology</p>
        </div>
        <div className="flex flex-col gap-4">
          <h1 className="font-semibold">About</h1>
          <p>Our story</p>
          <p>Shim blog</p>
          <p>Media kit</p>
          <p>Careers</p>
        </div>
        <div className="flex flex-col gap-4">
          <h1 className="font-semibold">Support</h1>
          <p>F.A.Q</p>
          <p>Help & Support</p>
          <p>Privacy policy</p>
          <p>Terms of service</p>
          <p>Teacher resources</p>
        </div>
      </div>
      <div className="flex flex-row justify-between">
        <div className="flex flex-row gap-4 items-center">
          <p>2025 Shim Inc.</p>
          <FaTwitter className="text-gray-600 text-xl" />
          <FaFacebook className="text-gray-600 text-xl" />
          <FaInstagram className="text-gray-600 text-xl" />
          <p className="pl-4 border-l border-gray-500">Site map</p>
        </div>
        <div className="flex flex-row items-center gap-2">
          <p className="font-medium pr-2">Get our app</p>
          <img
            src="/src/assets/62fa6419161d3a1ad0681cbf_App Store.svg"
            alt="App store"
            className="object-cover w-32"
          />
          <img
            src="/src/assets/62fa641a161d3a2982681d00_Google Play.svg"
            alt="Google play"
            className="object-cover w-32"
          />
        </div>
      </div>
    </div>
  );
};

export default Footer;
