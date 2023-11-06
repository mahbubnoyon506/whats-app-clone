import { doc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { auth, database, googleProvider } from "../../firebase.init";
import { signInWithPopup } from "firebase/auth";
import whatsapp from "/assets/images/WhatsApp.webp";
import google from "/assets/images/google.png";

function SignIn() {
  const navigate = useNavigate();

  const addUser = async () => {
    const userDoc = doc(database, "Users", `${auth.currentUser?.uid}`);
    try {
      await setDoc(userDoc, {
        id: auth.currentUser?.uid,
        username: auth.currentUser?.displayName,
        profile_image: auth.currentUser?.photoURL,
      });
    } catch (err) {
      console.error(err);
    }
  };

  const googleSignin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      addUser();
      navigate("/");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="bg-gray-200 min-h-screen">
      <div className="bg-green-400 px-56 pt-12 pb-32 ">
        <div className="flex gap-3 items-center">
          <img className="w-24 h-24" src={whatsapp} alt="" />
          <h3 className="text-2xl font-medium ">WHATSAPP WEB</h3>
        </div>
      </div>

      <div className="bg-white p-12  w-8/12 rounded mt-[-100px] mx-auto shadow-md">
        <div className="flex justify-around gap-16 items-center">
          <div className="text-gray-800 text-lg space-y-6">
            <h2 className="text-xl font-semibold ">
              Use Whatschat on your computer
            </h2>
            <h5 className="">1. Open whatschat on your computer</h5>
            <h5 className="">2. Signin using google account</h5>
            <h5 className="">3. Signin using phone number</h5>
            <p className="text-lg font-semibold uppercase text-green-400 cursor-pointer hover:underline">
              Signin with phone number
            </p>
          </div>
          <div
            className="flex justify-center items-center outline outline-1 outline-gray-200 cursor-pointer"
            onClick={googleSignin}
          >
            <img className="w-48 h-48 p-3" src={google} alt="" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignIn;
