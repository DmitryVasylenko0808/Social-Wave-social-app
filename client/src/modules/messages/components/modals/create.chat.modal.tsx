import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useDebounce } from "../../../common/hooks/useDebounce";
import { usePage } from "../../../common/hooks/usePage";
import { List, ListItem, Loader, Modal, TextField } from "../../../common/ui";
import { ModalProps } from "../../../common/ui/modal.component";
import { useLazySearchUsersQuery } from "../../../users/api/users.api";
import { Search } from "lucide-react";
import { InfiniteScroll } from "../../../common/components";
import ChatCreateItem from "../chat.create.item";
import { useCreateChatMutation } from "../../api/messages.api";
import { useAuth } from "../../../auth/hooks/useAuth";

type CreateChatModalProps = ModalProps;

const CreateChatModal = ({ ...modalProps }: CreateChatModalProps) => {
  const { user } = useAuth();

  const [search, setSearch] = useState<string>("");
  const debounced = useDebounce(search, 500);

  const { page, nextPage, setPage } = usePage();
  const [triggerSearchUser, { data: users, isFetching }] =
    useLazySearchUsersQuery();
  const [triggerCreateChat] = useCreateChatMutation();

  const { t } = useTranslation();

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

  const handleCreateChat = (targetUserId: string) => {
    triggerCreateChat({ members: [user.userId as string, targetUserId] })
      .unwrap()
      .then(() => modalProps.onClose());
  };

  const isShowLoader = isFetching && page === 1;

  return (
    <Modal {...modalProps}>
      <div className="w-[460px]">
        <TextField
          placeholder={t("search")}
          leftAddon={
            isShowLoader ? (
              <Loader size="small" />
            ) : (
              <Search className="text-primary-200" />
            )
          }
          onChange={handleChange}
        />
        <div className="h-80 max-h-80 overflow-y-auto">
          <InfiniteScroll
            next={nextPage}
            currentPage={page}
            isFetching={isFetching}
            totalPages={users?.totalPages || 0}
          >
            <List className="gap-1">
              {users?.data.map((user) => (
                <ListItem key={user._id}>
                  <ChatCreateItem
                    user={user}
                    onClickCreateChat={() => handleCreateChat(user._id)}
                  />
                </ListItem>
              ))}
            </List>
          </InfiniteScroll>
        </div>
      </div>
    </Modal>
  );
};

export default CreateChatModal;
