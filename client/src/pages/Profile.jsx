import { useSelector, useDispatch } from "react-redux";
import { useEffect, useRef, useState } from "react";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase.js";
import {
  deleteFailure,
  deleteStart,
  deleteSuccess,
  signOutFailure,
  signOutStart,
  signOutSuccess,
  updateFailure,
  updateStart,
  updateSuccess,
} from "../features/userSlice.js";
import { Link } from "react-router-dom";

// firebase storage
// service firebase.storage {
//   match /b/{bucket}/o {
//     match /{allPaths=**} {
//       allow read
//       allow write:if
//       request.resource.size<2*1024*1024 && request.resource.contentType.matches('image/.*');
//     }
//   }
// }

const Profile = () => {
  const fileRef = useRef(null);
  const { currentUser, loading, error } = useSelector((state) => state.user);
  const [file, setFile] = useState(undefined);
  const [filePerc, setFilePerc] = useState(0);
  const [fileError, setFileError] = useState(false);
  const [formData, setFormData] = useState({});
  const [ifUpdatedSuccess, setIfUpdatedSuccess] = useState(false);
  const [userListing, setUserListing] = useState([]);
  const [userListingError, setUserListingError] = useState(false);

  const dispatch = useDispatch();
  console.log(filePerc);
  console.log(fileError);
  console.log(error);
  console.log(currentUser);

  //FUNCTIONS

  useEffect(() => {
    if (file) {
      handleFileUpload(file);
    }
  }, [file]);

  const handleFileUpload = (file) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setFilePerc(Math.floor(progress));
      },
      (error) => {
        setFileError(true);
        console.log(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setFormData({ ...formData, avatar: downloadURL });
          console.log(downloadURL);
        });
      }
    );
  };
  console.log(formData);
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(updateStart());
    try {
      const res = await fetch(
        `http://localhost:3007/api/v1/update/:${currentUser._id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );
      const data = await res.json();
      if (data.success === false) {
        dispatch(updateFailure(data.message));
        return;
      }
      dispatch(updateSuccess(data));
      setIfUpdatedSuccess(true);
      console.log(data);
    } catch (error) {
      dispatch(updateFailure(error.message));
      console.log(error);
    }
  };

  const handleDelete = async () => {
    dispatch(deleteStart());
    try {
      const res = await fetch(
        `http://localhost:3007/api/v1/delete/:${currentUser._id}`,
        {
          method: "DELETE",
        }
      );
      const data = await res.json();
      if (data.success === false) {
        dispatch(deleteFailure(data.message));
      }
      dispatch(deleteSuccess(data));
    } catch (error) {
      dispatch(deleteFailure(error.message));
    }
  };

  const handleSignOut = async () => {
    dispatch(signOutStart());
    try {
      const res = await fetch("http://localhost:3007/api/v1/auth/signOut");
      const data = await res.json();
      if (data.success === false) {
        dispatch(signOutFailure(data.message));
      }
      dispatch(signOutSuccess(data));
    } catch (error) {
      dispatch(signOutFailure(error.message));
    }
  };

  const handleShowListing = async () => {
    try {
      const res = await fetch(
        `http://localhost:3007/api/v1/listings/${currentUser.rest._id}`
      );
      const data = await res.json();
      if (data.success === false) {
        setUserListingError(true);
      }
      setUserListing(data);
    } catch (error) {
      setUserListingError(error.message);
    }
  };

  const handleDeleteListing=async(listingId)=>{
    try {
      const res=await fetch(`http://localhost:3007/api/v1/delete/${listingId}`,{
        method:"DELETE"
      });

      const data=await res.json();
      if(data.success===false){
        console.log(data.message);
      }

      setUserListing((prev)=>prev.filter((listing)=>listing._id!==listingId));
      
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">Profile</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          onChange={(e) => setFile(e.target.files[0])}
          type="file"
          ref={fileRef}
          hidden
          accept="images/*"
        />
        <img
          onClick={() => fileRef.current.click()}
          src={formData.avatar || currentUser.rest.avatar}
          alt="profile"
          className="rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2"
        />
        <p className="text-sm self-center">
          {fileError ? (
            <span className="text-red-700">Error Image Upload</span>
          ) : filePerc > 0 && filePerc < 100 ? (
            <span className="text-slate-700">{`Uploading ${filePerc}%`}</span>
          ) : filePerc === 100 ? (
            <span className="text-green-700">Image Successfuly Completed</span>
          ) : (
            ""
          )}
        </p>
        <input
          onChange={handleChange}
          type="text"
          placeholder="username"
          className="border p-3 rounded-lg"
          id="username"
          defaultValue={currentUser.rest.username}
        />
        <input
          onChange={handleChange}
          type="email"
          placeholder="email"
          className="border p-3 rounded-lg"
          id="email"
          defaultValue={currentUser.rest.email}
        />
        <input
          onChange={handleChange}
          type="password"
          placeholder="password"
          className="border p-3 rounded-lg"
          id="password"
        />
        <button
          disabled={loading}
          className=" bg-slate-700 text-white rounded-lg p-3 hover:opacity-95 disabled:opacity-80 uppercase"
        >
          {loading ? "Loading....." : "Update"}
        </button>
        <button className=" bg-green-700 text-white rounded-lg p-3 hover:opacity-95 disabled:opacity-80 uppercase">
          <Link to="/create-listing">Create Listing</Link>
        </button>
      </form>
      <div className="flex justify-between mt-5">
        <span onClick={handleDelete} className="text-red-700 cursor-pointer">
          Delete
        </span>
        <span onClick={handleSignOut} className="text-red-700 cursor-pointer">
          Sign out
        </span>
      </div>
      <p className="text-red-700 mt">{error ? error : ""}</p>
      <p className="text-green-700 mt">
        {ifUpdatedSuccess ? "User information updated successfuly!" : ""}
      </p>
      <button
        type="button"
        onClick={handleShowListing}
        className="text-green-700 w-full my-3 hover:opacity-40 "
      >
        Show Listings
      </button>
      {userListing.length > 0 &&
        userListing.map((list) => (
          <div key={list._id} className="border flex p-3 items-center my-7">
            <h1 className="text-center mt-7 text-2xl font-semibold">Your listings</h1>
            <img src={list.imageUrls[0]} alt="image" className="w-16 h-16 object-contain"/>
            <p className="truncate font-semibold">{list.description}</p>
            <div className="flex flex-col gap-3">
              <button onClick={()=>handleDeleteListing(list._id)} className="text-red-700 uppercase hover:opacity-50">
                Delete
              </button>
              <button className="text-green-700 uppercase hover:opacity-50">
                <Link to={`/edit-listing/${list._id}`}>
                   Edit
                </Link>
              </button>
            </div>
          </div>
        ))}
      {userListingError && (
        <p className="text-red-700 text-sm">{userListingError}</p>
      )}
    </div>
  );
};

export default Profile;
