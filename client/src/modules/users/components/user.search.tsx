import { useEffect, useState } from "react";
import { useLazySearchUsersQuery } from "../api/users.api";
import { useDebounce } from "../../common/hooks/useDebounce";
import { usePage } from "../../common/hooks/usePage";
import { Search } from "lucide-react";
import { List, ListItem, Loader, TextField } from "../../common/ui";
import { UserItem } from ".";
import { InfiniteScroll } from "../../common/components";

const UserSearch = () => {
  const [search, setSearch] = useState<string>("");
  const debounced = useDebounce(search, 500);
  const { page, nextPage, setPage } = usePage();
  const [triggerSearchUser, { data: users, isFetching }] =
    useLazySearchUsersQuery();

  useEffect(() => {
    setPage(1);
    triggerSearchUser({ query: debounced, page: 1 });
  }, [debounced]);

  useEffect(() => {
    if (page !== 1) {
      triggerSearchUser({ query: debounced, page });
    }
  }, [page]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const isShowLoader = isFetching && page === 1;
  const isShowList = !!users?.data.length;

  return (
    <div className="relative mb-10">
      <TextField
        placeholder="Search user..."
        leftAddon={
          isShowLoader ? (
            <Loader size="small" />
          ) : (
            <Search className="text-primary-200" />
          )
        }
        onChange={handleChange}
      />
      {isShowList && (
        <div
          className="absolute top-full z-10 gap-1 w-full max-h-80 overflow-auto my-3 p-3 rounded-3xl bg-white shadow-xl border border-secondary-50 
        dark:bg-dark-200 dark:border-dark-300"
        >
          <InfiniteScroll
            next={nextPage}
            currentPage={page}
            isFetching={isFetching}
            totalPages={users.totalPages}
          >
            <List className="gap-1">
              {users?.data.map((user) => (
                <ListItem key={user._id}>
                  <UserItem data={user} />
                </ListItem>
              ))}
            </List>
          </InfiniteScroll>
        </div>
      )}
    </div>
  );
};

export default UserSearch;
