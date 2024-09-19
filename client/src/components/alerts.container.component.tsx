import { Alert, List, ListItem } from "../common/ui";
import { useAlerts } from "../hooks/useAlerts";

const AlertsContainer = () => {
  const alerts = useAlerts();

  const handleClickRemove = (index: number) => alerts.remove(index);

  console.log(alerts);

  return (
    <div className="fixed top-0 left-0 z-60 w-full py-4 px-2 flex justify-center">
      <List className="flex fle-col gap-4">
        {alerts.items.map((item, index) => (
          <ListItem key={index}>
            <Alert {...item} onClose={() => handleClickRemove(index)} />
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default AlertsContainer;
