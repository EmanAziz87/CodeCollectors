const Profile = ({ user }) => {
  if (!user) {
    return null;
  }
  console.log('------', user.subscribedHubs);
  return (
    <div>
      <h2>{user.username}</h2>
      <div>
        <h3>Your Subscribed Hubs:</h3>
        <ul>
          {user.subscribedHubs.map((hub) => (
            <li key={hub}>{hub}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Profile;
