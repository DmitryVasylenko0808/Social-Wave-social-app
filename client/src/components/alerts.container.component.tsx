import { Alert, List, ListItem } from "../common/ui";
import { useAlerts } from "../hooks/useAlerts";

const AlertsContainer = () => {
  const alerts = useAlerts();

  const handleClickRemove = (id: string) => alerts.remove(id);

  return (
    <div className="fixed top-0 left-0 z-60 w-full py-4 px-2 flex justify-center">
      <List className="flex flex-col gap-4">
        {alerts.items.map((item) => (
          <ListItem key={item.id}>
            <Alert {...item} onClose={() => handleClickRemove(item.id)} />
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default AlertsContainer;
