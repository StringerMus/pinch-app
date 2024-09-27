import { createContext, useContext, useEffect, useState } from "react";
import { axiosReq } from "../api/axiosDefaults";
import { useCurrentUser } from "../contexts/CurrentUserContext";

const ProfileDataContext = createContext();
const SetProfileDataContext = createContext();

export const useProfileData = () => useContext(ProfileDataContext);
export const useSetProfileData = () => useContext(SetProfileDataContext);

export const ProfileDataProvider = ({ children }) => {
  const [profileData, setProfileData] = useState({
    pageProfile: { results: [] }, // Only pageProfile needed now
  });

  const currentUser = useCurrentUser();

//comment out this code
  useEffect(() => {
    const handleMount = async () => {
      try {
        // Removed the followers count ordering from the request
        const { data } = await axiosReq.get("/profiles/");
        setProfileData((prevState) => ({
          ...prevState,
          pageProfile: data, // Store the fetched profile data
        }));
      } catch (err) {
        console.log(err);
      }
    };

    handleMount();
  }, [currentUser]);
//comment out

  return (
    <ProfileDataContext.Provider value={profileData}>
      <SetProfileDataContext.Provider value={setProfileData}>
        {children}
      </SetProfileDataContext.Provider>
    </ProfileDataContext.Provider>
  );
};
