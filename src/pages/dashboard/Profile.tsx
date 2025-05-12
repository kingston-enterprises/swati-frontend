import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {Input }from '../../components/custom/Input';
import {Button} from '../../components/custom/Button'; 
import { PhoneInput } from '../../components/custom/PhoneInput'; 
import { useSelector } from "react-redux";
import { formatDate } from "../../lib/utils.ts";
import person from "@/assets/person.svg";
import { useDispatch } from "react-redux";
import { updateProfile } from "../../features/profile/profileSlice";
export const Profile: React.FC = () => {
 
  const { user } = useSelector((state : any) => state.auth);

  const [firstName, setFirstName] = useState(user.first_name);
  const [lastName, setLastName] = useState(user.last_name);
  const [profilePicture, setProfilePicture] = useState('')
  const [gender, setGender] = useState(user.gender);
  const [dateOfBirth, setDateOfBirth] = useState(user.date_of_birth);
  const [address, setAddress] = useState(user.address);
  const [email, setEmail] = useState(user.email);
  const [phoneNumber, setPhoneNumber] = useState(user.phone_number); // Example Eswatini number
  const [privacySetting, setPrivacySetting] = useState('Public');

  const dispatch = useDispatch();

  const handleSave = () => {
    // Implement your save logic here
    console.log('Saving profile changes...');
    console.log({ firstName, lastName, gender, dateOfBirth, address, email, phoneNumber, privacySetting });
    console.log(profilePicture);
    
   // Prepare the data to send to the updateProfile thunk
    const updatedUserData = {
      first_name: firstName,
      last_name: lastName,
      gender: gender,
      date_of_Birth: dateOfBirth,
      //address: {
      //  region: address.region,
      //  city: address.city,
      //  localArea: address.localArea,
      //},
      email: email,
      phone_number: phoneNumber,
      // Note: You might need a separate API endpoint for updating privacy settings
      // and profile pictures, as they often involve different data handling.
      // If you want to include them here, ensure your backend API is set up to handle them.
      // privacy_setting: privacySetting,
      // profile_picture: profilePicture,
    };

    // Dispatch the updateProfile thunk with the updated user data
    dispatch(updateProfile(updatedUserData));
  };




  return (
    <div className="min-h-screen bg-primary p-4">
      <div className="container mx-auto max-w-xl bg-white shadow-md rounded-lg overflow-hidden">
        {/* Header */}
        <div className="bg-secondary py-6 px-4 border-b border-primary-accent text-center">
          <div className="relative w-32 h-32 z-40 mx-auto rounded-full overflow-hidden border-4 border-white shadow-md">
            <img src={person} alt="Profile Picture" className="object-cover w-full h-full" />
            <label htmlFor="profile-picture-upload" className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center text-white cursor-pointer opacity-0 hover:opacity-100 transition-opacity duration-300">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
            </label>
            <input type="file" id="profile-picture-upload" className="hidden" onChange={(e:any) => { setProfilePicture(e)}} />
          </div>
          <h2 className="text-xl font-semibold mt-2">{`${user.first_name} ${user.last_name}`}</h2>
          <p className="text-gray-600 text-sm">{`Member since ${formatDate(user.createdAt)}`}</p> {/* Example */}
        </div>

        {/* Personal Details */}
        <div className="p-6 border-b border-gray-300">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">Personal Details</h3>
          <div className="space-y-4">
            <div>
              <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">First Name</label>
              <Input type="text" id="firstName" value={firstName} onChange={(e:any) => setFirstName(e.target.value)} variant="primary" rounded="md" />
            </div>
            <div>
              <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">Last Name</label>
              <Input type="text" id="lastName" value={lastName} onChange={(e:any) => setLastName(e.target.value)} variant="primary" rounded="md" />
            </div>
            <div>
              <label htmlFor="gender" className="block text-sm font-medium text-gray-700">Gender</label>
              <select id="gender" value={gender} onChange={(e:any) => setGender(e.target.value)} className="w-full p-2.5 border border-gray-300 rounded-md shadow-sm focus:ring-accent focus:border-accent text-gray-700 sm:text-sm">
                <option>Male</option>
                <option>Female</option>
                <option>Rather Not Say</option>
              </select>
            </div>
            <div>
              <label htmlFor="dateOfBirth" className="block text-sm font-medium text-gray-700">Date of Birth</label>
              <Input type="date" id="dateOfBirth" value={dateOfBirth} onChange={(e:any) => setDateOfBirth(e.target.value)} variant="primary" rounded="md" />
            </div>
          </div>
        </div>

        {/* Address */}
        <div className="p-6 border-b border-gray-300">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">Address</h3>
          <div>
            <label htmlFor="address" className="block text-sm font-medium text-gray-700">Address</label>
            <Input type="text" id="address" value={address} onChange={(e:any) => setAddress(e.target.value)} variant="primary" rounded="md" />
          </div>
        </div>

        {/* Contact Details */}
        <div className="p-6 border-b border-gray-300">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">Contact Details</h3>
          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
              <Input type="email" id="email" value={email} onChange={(e:any) => setEmail(e.target.value)} variant="primary" rounded="md" />
            </div>
            <div>
              <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700">Phone Number</label>
              <PhoneInput value={phoneNumber} onChange={setPhoneNumber}  />
            </div>
          </div>
        </div>

        {/* Privacy Settings */}
        <div className="p-6">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">Privacy Settings</h3>
          <div>
            <label htmlFor="privacy" className="block text-sm font-medium text-gray-700">Profile Visibility</label>
            <select id="privacy" value={privacySetting} onChange={(e:any) => setPrivacySetting(e.target.value)} className="w-full p-2.5 border border-gray-300 rounded-md shadow-sm focus:ring-accent focus:border-accent text-gray-700 sm:text-sm">
              <option>Public</option>
              <option>Friends Only</option>
              <option>Private</option>
            </select>
            <p className="text-sm text-gray-500 mt-2">Control who can see your profile information.</p>
          </div>
        </div>

        {/* Save Button */}
        <div className="py-4 px-6 bg-gray-200 border-t border-gray-300 text-right">
          <Button onClick={handleSave} variant="secondary" rounded="md">Save Changes</Button>
          <Link to="/dashboard" className="inline-block ml-2">
            <Button variant="primary-outline" rounded="md">Cancel</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

