"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Suspense, useEffect, useState } from "react";
import MainLayout from "@/layout/MainLayout";
import { useSearchParams } from "next/navigation";
import ProfileSettings from "../profile/_components/ProfileSettings";
import { useGetBookingById, useGetProfile } from "@/hooks/get.hooks";
import SelectedContinueItem from "./SelectedContinueItem";
import ParticipantEdit from "./ParticipantEdit";
import { Skeleton } from "@/components/ui/skeleton";
import { CheckCircle2, XCircle } from "lucide-react";
import GuestProfileSettings from "../profile/_components/GuestProfileSettings";

const isProfileComplete = (profile: any): boolean => {
  if (!profile?.data) return false;
  return (
    !!profile.data.first_name &&
    !!profile.data.last_name &&
    !!profile.data.email &&
    !!profile.data.phone
  );
};
const isGuestComplete = (data: any): boolean => {
  if (!data) return false;
  return !!data.first_name && !!data.last_name && !!data.email && !!data.phone;
};

const areParticipantsComplete = (participants: any[]): boolean => {
  return participants?.every(
    (participant) => participant.first_name && participant.last_name
  );
};

const PersonalInfoContent = () => {
  const { data: profile, isLoading } = useGetProfile();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const { data: selectedBookingCart, refetch } = useGetBookingById(id);
  const [activeTab, setActiveTab] = useState("participants");
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setToken(localStorage.getItem("access_token"));
    }
  }, []);

  const participantComplete =
    !isLoading && areParticipantsComplete(selectedBookingCart?.participants);
  const profileComplete = !isLoading && isProfileComplete(profile);
  const guestComplete =
    !isLoading &&
    selectedBookingCart?.is_guest &&
    isGuestComplete(selectedBookingCart);
  const is_guest = selectedBookingCart?.is_guest;

  const CompletionIcon = ({ complete }: { complete: boolean }) => (
    <span className="ml-2">
      {complete ? (
        <CheckCircle2 className="h-5 w-5 text-green-500" />
      ) : (
        <XCircle className="h-5 w-5 text-red-500" />
      )}
    </span>
  );

  return (
    <MainLayout>
      <div className="mx-4 md:mx-10 lg:mx-20 my-10 lg:grid grid-cols-3 gap-5">
        <div className="col-span-2 space-y-6">
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full"
          >
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger
                value="participants"
                disabled={!selectedBookingCart?.participants}
                className="flex items-center justify-center"
              >
                Participants Info
                {!isLoading && selectedBookingCart?.participants && (
                  <CompletionIcon complete={participantComplete} />
                )}
              </TabsTrigger>
              <TabsTrigger
                value="profile"
                className="flex items-center justify-center"
              >
                {is_guest ? "Guest Details" : "Your Profile"}
                {!isLoading && (
                  <CompletionIcon
                    complete={is_guest ? guestComplete : profileComplete}
                  />
                )}
              </TabsTrigger>
            </TabsList>

            <TabsContent value="profile">
              {isLoading ? (
                <div className="space-y-4">
                  <Skeleton className="h-10 w-full" />
                  <Skeleton className="h-80 w-full" />
                </div>
              ) : token ? (
                <ProfileSettings />
              ) : (
                <GuestProfileSettings
                  refetch={refetch}
                  profileData={selectedBookingCart}
                />
              )}
            </TabsContent>

            <TabsContent value="participants">
              {isLoading ? (
                <div className="space-y-4">
                  <Skeleton className="h-10 w-full" />
                  <Skeleton className="h-80 w-full" />
                </div>
              ) : (
                selectedBookingCart?.participants && (
                  <ParticipantEdit
                    participants={selectedBookingCart.participants}
                    refetch={refetch}
                  />
                )
              )}
            </TabsContent>
          </Tabs>
        </div>

        <div className="col-span-1 mt-6 lg:mt-0">
          <Suspense fallback={<Skeleton className="h-40 w-full" />}>
            {selectedBookingCart ? (
              <SelectedContinueItem
                selectedBookingCart={selectedBookingCart}
                profileComplete={is_guest ? guestComplete : profileComplete}
                participantComplete={participantComplete}
              />
            ) : (
              <Skeleton className="h-40 w-full" />
            )}
          </Suspense>
        </div>
      </div>
    </MainLayout>
  );
};

// Main component with Suspense boundary
const PersonalInfo = () => {
  return (
    <Suspense
      fallback={
        <MainLayout>
          <div className="flex items-center justify-center h-screen">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        </MainLayout>
      }
    >
      <PersonalInfoContent />
    </Suspense>
  );
};

export default PersonalInfo;
