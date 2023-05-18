"use client";
import { Video } from "lucide-react";
import { Button } from "../ui/button";

interface VirtualProps {
  doctor: [any];
}
export function VirtualRoom({ doctor }: VirtualProps) {
  function goToVirtualRoom() {
    window.open(
      `https://dokko.daily.co/${doctor[0].attributes.uid}?t=${doctor[0].attributes.meeting_token}`
    );
  }
  return (
    <Button size="sm" onClick={goToVirtualRoom}>
      <Video className="mr-2 h-4 w-4" />
      Enter Virtual Room
    </Button>
  );
}
