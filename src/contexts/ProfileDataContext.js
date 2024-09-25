import { createContext, useContext, useEffect, useState } from "react";
import { axiosReq } from "../api/axiosDefaults";
import { useCurrentUser } from "./CurrentUserContext";

export const ProfileDataContext = createContext();
export const SetProfileDataContext = createContext();

export const useProfileData = () => useContext(ProfileDataContext);
export const useSetProfileData = () => useContext(SetProfileDataContext);

export const ProfileDataProvider = ({ children }) => {
    const [profileData, setProfileData] = useState({
        pageProfile: { results: [] },
        // popularProfiles no longer need it
        // popularProfiles: { results: [] },
    });
     
    const currentUser = useCurrentUser();
     
    useEffect(() => {
        const handleMount = async () => {
          try {
            const { data } = await axiosReq.get("/profiles/");
            setProfileData((prevState) => ({
              ...prevState,
              pageProfile: data,
            }));
          } catch (err) {
            console.log(err);
          }
        };
        handleMount();
    }, [currentUser]);

    return (
        <ProfileDataContext.Provider value={profileData}>
            <SetProfileDataContext.Provider value={setProfileData}>
                {children}
            </SetProfileDataContext.Provider>
        </ProfileDataContext.Provider>
    );
};
