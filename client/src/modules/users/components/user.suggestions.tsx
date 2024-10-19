import { useEffect } from "react";
import { UserItem } from ".";
import { useLazyGetSuggestedUsersQuery } from "../../../api/users/users.api";
import { useAuth } from "../../../hooks/useAuth";
import { List, ListItem, Loader } from "../../common/ui";

const UserSuggestions = () => {
  const { isAuthenticated, user } = useAuth();
  const [triggerGetSuggestedUsers, { data, isLoading }] =
    useLazyGetSuggestedUsersQuery();

  useEffect(() => {
    if (user.userId) {
      triggerGetSuggestedUsers(user.userId);
    }
  }, [user]);

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div>
      <h2 className="mb-4 text-2xl text-black font-bold dark:text-white">
        Who to follow
      </h2>
      {isLoading && <Loader position="center" />}
      {data && (
        <div className="p-4 border-2 rounded-2xl border-secondary-50 dark:border-dark-300">
          <List className="gap-1">
            {data?.map((user) => (
              <ListItem key={user._id}>
                <UserItem data={user} />
              </ListItem>
            ))}
          </List>
        </div>
      )}
    </div>
  );
};

export default UserSuggestions;
