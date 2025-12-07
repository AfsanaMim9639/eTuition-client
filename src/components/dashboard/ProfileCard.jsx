import useAuth from '../../hooks/useAuth';

const ProfileCard = () => {
  const { user } = useAuth();

  return (
    <div className="card-neon card-neon-pink p-6 rounded-xl">
      <div className="flex items-center gap-4">
        <img 
          src={user?.profileImage || 'https://i.ibb.co/qpB9ZNp/default-avatar.png'} 
          alt={user?.name}
          className="w-16 h-16 rounded-full neon-border-pink"
        />
        <div>
          <h3 className="text-xl font-bold">{user?.name}</h3>
          <p className="text-gray-400">{user?.email}</p>
          <span className="text-sm px-2 py-1 bg-neon-blue/20 text-neon-blue border border-neon-blue/30 rounded capitalize">
            {user?.role}
          </span>
        </div>
      </div>
    </div>
  );
};
export default ProfileCard;