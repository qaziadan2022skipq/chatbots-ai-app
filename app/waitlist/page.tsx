import React from 'react'

const Notice = () => {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gray-100 p-4">
        <h1 className="text-4xl font-bold text-gray-800 mb-6">Access Pending</h1>
        <p className="text-lg text-gray-600 text-center max-w-md">
          Thank you for your interest in our platform! Your request for access is currently under review.
          Please wait patiently while our admin processes your request. You will receive a notification
          once your access has been approved.
        </p>
      </div>
    );
  };
  
  export default Notice;
