import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";

export function Inbox() {
  const conversations = [
    {
      id: 1,
      name: "Dr. John Doe",
      message: "Hello, how are you?",
      time: "2:30 PM",
    },
    {
      id: 2,
      name: "Dr. John Doe",
      message: "Hello, how are you?",
      time: "2:30 PM",
    },
  ];

  return (
    <>
      <Card className="col-span-2">
        <CardHeader>
          <CardTitle>Inbox</CardTitle>
        </CardHeader>
        <CardContent className="pl-6">
          <div className="flex flex-col space-y-4">
            {conversations.map((conversation) => (
              <div
                className="flex flex-row items-center justify-between space-y-0 pb-2"
                key={conversation.id}
              >
                <div className="flex flex-row items-center space-x-2">
                  <div className="h-12 w-12 rounded-full bg-gray-200"></div>
                  <div className="flex flex-col">
                    <div className="text-sm font-medium">
                      {conversation.name}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {conversation.message}
                    </div>
                  </div>
                </div>
                <div className="text-xs text-muted-foreground">
                  {conversation.time}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
      <Card className="col-span-5">
        <CardHeader>
          <CardTitle>Recent Appointments</CardTitle>
          <CardDescription></CardDescription>
        </CardHeader>
        <CardContent></CardContent>
      </Card>
    </>
  );
}
