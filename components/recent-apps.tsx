import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface RecentAppointmentsProps {
  data: [any];
}
export function RecentAppointments({ data }: RecentAppointmentsProps) {
  return (
    <div className="space-y-8">
      {data.map((appointment: any) => (
        <div className="flex items-center">
          <Avatar className="h-9 w-9">
            <AvatarImage src={appointment.doctorLink} alt="Avatar" />
            <AvatarFallback>OM</AvatarFallback>
          </Avatar>
          <div className="ml-4 space-y-1">
            <p className="text-sm font-medium leading-none">
              {appointment.condition}
            </p>
            <p className="text-sm text-muted-foreground">
              {appointment.doctor}
            </p>
          </div>
          <div className="ml-auto font-medium">
            {appointment.generalPurpose}
          </div>
        </div>
      ))}
    </div>
  );
}
