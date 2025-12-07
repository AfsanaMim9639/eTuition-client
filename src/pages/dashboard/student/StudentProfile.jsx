export const StudentProfile = () => {
  const { user } = useAuth();
  
  return (
    <div className="max-w-2xl mx-auto card-neon card-neon-pink p-8 rounded-xl">
      <h1 className="text-3xl font-bold neon-text-pink mb-6">My Profile</h1>
      <div className="flex items-center gap-6 mb-6">
        <img src={user?.profileImage} alt={user?.name} className="w-24 h-24 rounded-full neon-border-pink" />
        <div>
          <h2 className="text-2xl font-bold">{user?.name}</h2>
          <p className="text-gray-400">{user?.email}</p>
          <p className="text-sm text-neon-blue capitalize">{user?.role}</p>
        </div>
      </div>
      <button className="btn btn-neon-blue px-6 py-3 rounded-lg font-semibold">Edit Profile</button>
    </div>
  );
};