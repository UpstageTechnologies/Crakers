import { useEffect, useState } from "react";
import { auth, db, storage } from "../lib/firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useNavigate } from "react-router-dom";
import { IoClose } from "react-icons/io5";
import Loading from "../ui/Loading";

const EditProfile = () => {
  const navigate = useNavigate();

  const [saving, setSaving] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const [profile, setProfile] = useState({
    firstName: "",
    lastName: "",
    mobile: "",
    avatar: "",
  });
  useEffect(() => {
    const fetchUser = async () => {
      const user = auth.currentUser;
      if (!user) return;

      const docRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data();
        setProfile({
          firstName: data.firstName || "",
          lastName: data.lastName || "",
          mobile: data.mobile || "",
          avatar: data.avatar || "",
        });
      }
    };

    fetchUser();
  }, []);

  // INPUT CHANGE
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value,
    });
  };

  // IMAGE SELECT
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  // SAVE PROFILE
  const handleSave = async () => {
    const user = auth.currentUser;
    if (!user) return;

    if (
      !profile.firstName.trim() ||
      !profile.lastName.trim() ||
      !profile.mobile.trim()
    ) {
      alert("Please fill all fields");
      return;
    }

    try {
      setSaving(true);

      let imageUrl = profile.avatar;

      if (selectedFile) {
        const imageRef = ref(storage, `profileImages/${user.uid}`);
        await uploadBytes(imageRef, selectedFile);
        imageUrl = await getDownloadURL(imageRef);
      }

      
      await updateDoc(doc(db, "users", user.uid), {
        firstName: profile.firstName,
        lastName: profile.lastName,
        mobile: profile.mobile,
        avatar: imageUrl,
      });

      alert("Profile Updated Successfully");
      navigate("/profile");
    } catch (error) {
      console.log(error);
      alert("Update Failed");
    } finally {
      setSaving(false);
    }
  };

  return (
    <>
      {saving && <Loading />}

      <div className="min-h-screen bg-[#ffffff] flex items-center justify-center p-5">

        <div className="w-full max-w-md bg-[#1F2937] text-white p-6 rounded-xl">

          {/* HEADER */}
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold">Edit Profile</h2>

            <button onClick={() => navigate("/profile")}>
              <IoClose className="hover:text-red-500 text-xl "/>
            </button>
          </div>

          {/* IMAGE SECTION */}
          <div className="flex flex-col items-center mb-5">

            <img
              src={
                selectedFile
                  ? URL.createObjectURL(selectedFile)
                  : profile.avatar ||
                    "https://i.ibb.co/mJRkRRV/png-clipart-profile-logo-computer-icons-user-user-blue-heroes-thumbnail.png"
              }
              className="w-24 h-24 rounded-full object-cover border"
            />

            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="mt-3 text-sm"
            />
          </div>

          {/* INPUTS */}
          <div className="space-y-3">

            <input
              type="text"
              name="firstName"
              value={profile.firstName}
              onChange={handleChange}
              placeholder="First Name"
              className="w-full p-3 rounded bg-gray-700"
            />

            <input
              type="text"
              name="lastName"
              value={profile.lastName}
              onChange={handleChange}
              placeholder="Last Name"
              className="w-full p-3 rounded bg-gray-700"
            />

            <input
              type="text"
              name="mobile"
              value={profile.mobile}
              onChange={handleChange}
              placeholder="Mobile Number"
              className="w-full p-3 rounded bg-gray-700"
            />
          </div>

          {/* SAVE BUTTON */}
          <button
            onClick={handleSave}
            disabled={saving}
            className="w-full mt-5 bg-red-500 py-3 rounded font-semibold"
          >
            {saving ? "Saving..." : "Save Changes"}
          </button>

        </div>
      </div>
    </>
  );
};

export default EditProfile;